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
import { JwtPayload } from './strategies/jwt';

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
    const user = await this.userService.getUserPasswordByEmail(email);
    if (!user) return null;

    const isValidPassword = await this.verifyPassword(password, user.password);

    return user && isValidPassword ? plainToInstance(ResponseWithoutRelationsUserDto, user) : null;
  }

  async validateGoogleUser(email: string, googleId: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUserPasswordByEmail(email);

    if (user && user.googleId === googleId) return plainToInstance(ResponseWithoutRelationsUserDto, user);

    return null;
  }

  async signJwtToken(userId: string): Promise<string> {
    const payload: JwtPayload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async signGoogleId(googleId: string): Promise<string> {
    const payload: JwtPayload = { sub: googleId };

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return accessToken;
  }

  // TODO: extract to a separate service.
  attachJwtTokenToCookie(res: Response, token: string) {
    const secure = this.configObject.NODE_ENV === 'production';

    res.cookie(AuthService.JWT_COOKIE_NAME, token, { httpOnly: true, secure });
  }

  async getUser(userId: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUser(userId);

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  /**
   * Doesn't check if token is valid
   * @param token Jwt Token
   * @returns bool if token is close to expire
   */
  jwtCloseToExpire(token: string): boolean {
    const payload = this.jwtService.decode<JwtPayload & { exp: number }>(token);
    if (!payload || !payload.sub || !payload.exp) return false;

    // payload.exp => seconds
    const intervalLeft = payload.exp - Date.now() / 1000;
    if (intervalLeft < 0) return false;

    const isCloseToExpire = intervalLeft < this.authObject.JWT_EXPIRATION_TRESHOLD_SECONDS;
    return isCloseToExpire;
  }

  private async signUpUserWithPassword(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    const patient = await this.createPatient(body);

    return plainToInstance(ResponsePatientDto, patient);
  }

  private async signUpUserWithGoogleId(body: AuthSignUpDto): Promise<ResponsePatientDto> {
    const { sub } = await this.jwtService.verifyAsync<JwtPayload>(body.googleId);

    if (!sub) throw new BadRequestException('Invalid googleId');
    body.googleId = sub;

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
    const password = body.password && (await this.hashPassword(body.password));

    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      password,
      googleId: body.googleId,
      emailVerified: false, // TODO: google email verified
      avatarKey: '', // TODO: use file service.
    });

    // TODO: Can we reduce this code?
    const patient = await this.patientService.createPatient({
      userId: user.id,
      age: body.age,
      bloodType: body.bloodType,
      weight: body.weight,
      height: body.height,
      gender: body.gender,
      city: body.city,
      country: body.country,
      street: body.street,
      apartment: body.apartment,
      state: body.state,
      zipCode: body.zipCode,
      identityCardKey: '',
    });

    return plainToInstance(ResponsePatientDto, patient);
  }
}
