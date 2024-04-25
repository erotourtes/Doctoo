import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import auth from '../config/auth';
import { PatientService } from '../patient/patient.service';
import { ResponseWithoutRelationsUserDto } from '../user/dto/responseWithoutRelations';
import { UserService } from '../user/user.service';
import { AuthSignUpPatientDto, AuthSignUpUserDto } from './dto/signUp.dto';
import { JwtPayload } from './strategies/jwt';
import { ResponsePatientDto } from '../patient/dto/response.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    @Inject(auth.KEY) private readonly authObject: ConfigType<typeof auth>,
  ) {}

  async signUpPatient(body: AuthSignUpPatientDto, token: string): Promise<ResponsePatientDto> {
    const verified = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => {
      throw new BadRequestException();
    });
    return await this.patientService.createPatient({
      ...body,
      userId: verified.sub,
    });
  }

  async signUpUser(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    if (body.password) return await this.signUpUserWithPassword(body);
    throw new BadRequestException();
  }

  async signUpUserWithGoogle(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    if (body.googleId) return await this.signUpUserWithGoogleId(body);
    throw new BadRequestException();
  }

  async validatePatientByEmail(email: string, password: string): Promise<ResponsePatientDto | null> {
    const user = await this.userService.getUserPasswordByEmail(email);
    if (!user) return null;
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) return null;

    const patient = await this.patientService.getPatientByUserId(user.id);

    return patient;
  }

  async validateGoogleUser(email: string, googleId: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUserPasswordByEmail(email);
    if (!user) return null;
    const patient = await this.patientService.getPatientByUserId(user.id);

    if (user && patient && user.googleId === googleId) return plainToInstance(ResponseWithoutRelationsUserDto, user);

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

  private async signUpUserWithPassword(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const existingUser: ResponseWithoutRelationsUserDto | null = await this.userService
      .getUserByEmail(body.email)
      .catch(() => null);
    if (existingUser) throw new BadRequestException('User already exists');

    const password = await this.hashPassword(body.password);
    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      googleId: body.googleId,
      emailVerified: false,
      password,
      avatarKey: '', // TODO: use file service.
    });

    const token = await this.jwtService.signAsync({ sub: user.id }, { expiresIn: '1d' });
    this.mailService.sendPatientSignUpMail(user.email, user.firstName, token);

    return user;
  }

  private async signUpUserWithGoogleId(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const existingUser: ResponseWithoutRelationsUserDto | null = await this.userService
      .getUserByEmail(body.email)
      .catch(() => null);
    if (existingUser) {
      if (existingUser.emailVerified) throw new BadRequestException('User already exists');
      return existingUser;
    }

    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      googleId: body.googleId,
      emailVerified: false,
      avatarKey: '', // TODO: use file service.
    });

    return user;
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
}
