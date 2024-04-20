import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import auth from '../config/auth';
import config from '../config/config';
import { ResponsePatientDto } from '../patient/dto/response.dto';
import { PatientService } from '../patient/patient.service';
import { ResponseWithoutRelationsUserDto } from '../user/dto/responseWithoutRelations';
import { UserService } from '../user/user.service';
import { AuthSignUpDto } from './dto/signUp.dto';

// TODO: Maybe we need to create types folder for this?
type JwtPayload = { sub: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    @Inject(config.KEY) private readonly configObject: ConfigType<typeof config>,
    @Inject(auth.KEY) private readonly authObject: ConfigType<typeof auth>,
  ) {}

  static readonly JWT_COOKIE_NAME = 'jwt';

  async signUpUser(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    if (body.password) return await this.signUpUserWithPassword(body);
    else if (body.googleId) return await this.signUpUserWithGoogleId(body);

    throw new BadRequestException();
  }

  async validateUser(email: string, password: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUserByEmail(email);
    const isValidPassword = await this.verifyPassword(password, user.password);

    return user && isValidPassword ? plainToInstance(ResponseWithoutRelationsUserDto, user) : null;
  }

  async validateGoogleUser(email: string, googleId: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.googleId === googleId) return plainToInstance(ResponseWithoutRelationsUserDto, user);

    return null;
  }

  async signJwtToken(userId: string): Promise<string> {
    const payload: JwtPayload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload); // TODO: Should we also set expiresIn?

    return accessToken;
  }

  async signGoogleId(googleId: string): Promise<string> {
    const payload: JwtPayload = { sub: googleId };

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return accessToken;
  }

  private async isValidSignedGoogleId(signedGoogleId: string): Promise<boolean> {
    const payload = await this.jwtService.verifyAsync(signedGoogleId).catch(() => null);

    return payload !== null;
  }

  attachJwtTokenToCookie(res: Response, token: string) {
    const secure = this.configObject.NODE_ENV === 'production';

    res.cookie(AuthService.JWT_COOKIE_NAME, token, { httpOnly: true, secure });
  }

  async getUserFromJwtToken(token?: string): Promise<ResponseWithoutRelationsUserDto | null> {
    if (!token) return null;

    const { sub } = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => ({ sub: null }));

    if (!sub) return null;

    const user = await this.userService.getUser(sub);

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  private async signUpUserWithPassword(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    const patient = await this.createPatient(body);

    return plainToInstance(ResponsePatientDto, patient);
  }

  private async signUpUserWithGoogleId(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    const isValidGoogleId = await this.isValidSignedGoogleId(body.googleId);

    if (!isValidGoogleId) throw new BadRequestException('Invalid googleId');

    const patient = await this.createPatient(body);

    return plainToInstance(ResponsePatientDto, patient);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.authObject.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, hash);

    return isValidPassword;
  }

  private async createPatient(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    const password = body.password && (await this.hashPassword(body.password)); // TODO: hashPassword?

    const user = await this.userService.createUser({ ...body, password });

    // TODO: Can we reduce this code?
    const patient = await this.patientService.createPatient({
      userId: user.id,
      age: body.age,
      bloodType: body.bloodType,
      weight: body.weight,
      height: body.height,
      gender: body.gender,
      identityCardKey: '1',
      city: '',
      country: '',
      street: '',
      apartment: '',
      state: '',
      zipCode: 1,
    });

    return plainToInstance(ResponsePatientDto, patient);
  }
}
