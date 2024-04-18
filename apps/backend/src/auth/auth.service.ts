import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import config from 'src/config/config';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { ResponseUserDto } from 'src/user/dto/response.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import authConfig from 'src/config/auth-config';
import { ResponseWithoutRelationsUserDto } from 'src/user/dto/responseWithoutRelations';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { PatientService } from 'src/patient/patient.service';
import { ResponsePatientDto } from 'src/patient/dto/response.dto';

type JwtPayload = { sub: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    @Inject(config.KEY) private readonly conf: ConfigType<typeof config>,
    @Inject(authConfig.KEY) private readonly authConf: ConfigType<typeof authConfig>,
  ) {}

  async signupUser(createUserDto: SignUpDto): Promise<ResponsePatientDto> {
    if (createUserDto.password) return await this.signUpUserWithPassword(createUserDto);
    else if (createUserDto.google_id) return await this.signUpUserWithGoogleId(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<ResponseUserDto | null> {
    const user = await this.userService.findUserByEmail(email);
    const isValid = user && (await this.verifyPassword(password, user.password));
    return isValid ? user : null;
  }

  async validateGoogleUser(email: string, google_id: string): Promise<ResponseUserDto | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.google_id === google_id) {
      return user;
    }
    return null;
  }

  async signJwtToken(userId: string) {
    const payload: JwtPayload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signGoogleId(googleId: string) {
    return await this.jwtService.signAsync({ sub: googleId }, { expiresIn: '1d' });
  }

  private async isValidSignedGoogleId(signedGoogleId: string): Promise<boolean> {
    const payload = await this.jwtService.verifyAsync(signedGoogleId).catch(() => null);
    return payload !== null;
  }

  attachJwtTokenToCookie(res: Response, token: string) {
    res.cookie(AuthService.JWT_COOKIE_NAME, token, { httpOnly: true, secure: this.conf.nodeEnv === 'production' });
  }

  async getUserFromJwtToken(token?: string): Promise<ResponseUserDto> {
    if (!token) return null;

    const { sub } = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => ({ sub: null }));
    if (!sub) return null;

    const user = await this.userService.getUser(sub);
    return user;
  }

  private async signUpUserWithPassword(createUserDto: SignUpDto): Promise<ResponsePatientDto> {
    return await this.createPatient(createUserDto);
  }

  private async signUpUserWithGoogleId(createUserDto: SignUpDto): Promise<ResponsePatientDto> {
    const isValid = await this.isValidSignedGoogleId(createUserDto.google_id);
    if (!isValid) throw new BadRequestException('Invalid google id');
    return await this.createPatient(createUserDto);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.authConf.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async createPatient(createUserDto: SignUpDto): Promise<ResponsePatientDto> {
    const user = await this.userService.createUser({
      avatar_key: createUserDto.avatar_key,
      email: createUserDto.email,
      first_name: createUserDto.first_name,
      google_id: createUserDto.google_id,
      last_name: createUserDto.last_name,
      phone: createUserDto.phone,
      email_verified: createUserDto.email_verified,
      password: createUserDto.password && (await this.hashPassword(createUserDto.password)),
    });
    const patient = await this.patientService.createPatient({
      user_id: user.id,
      age: createUserDto.age,
      blood_type: createUserDto.blood_type,
      weight: createUserDto.weight,
      height: createUserDto.height,
      city: createUserDto.city,
      country: createUserDto.country,
      declaration_id: createUserDto.declaration_id,
      gender: createUserDto.gender,
      identity_card_key: createUserDto.identity_card_key,
      street: createUserDto.street,
    });
    return patient;
  }

  static readonly JWT_COOKIE_NAME = 'jwt';
}
