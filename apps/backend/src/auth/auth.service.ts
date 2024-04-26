import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { ChangePasswordDto } from './dto/change-password.dto';
import { TwoFactorAuthDto } from './dto/localLogin.dto';
import { GetMePatientResponseDto } from './dto/response.dto';

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
    const patient = await this.patientService.createPatient({
      ...body,
      userId: verified.sub,
    });
    this.userService.setVerified(verified.sub, true);
    return patient;
  }

  async signUpUser(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    if (body.password) return await this.signUpUserWithPassword(body);
    throw new BadRequestException();
  }

  async signUpUserWithGoogle(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    if (body.googleId) return await this.signUpUserWithGoogleId(body);
    throw new BadRequestException();
  }

  async validatePatientByEmail(
    email: string,
    password: string,
  ): Promise<{ is2faEnabled: boolean; patient: ResponsePatientDto | null }> {
    const user = await this.userService.getUserWithSecretsByEmail(email);
    if (!user) return { is2faEnabled: false, patient: null };
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) return { is2faEnabled: false, patient: null };

    const patient = await this.patientService.getPatientByUserId(user.id);

    if (user.twoFactorAuthToggle) {
      const { code, hashed } = await this.get2faCode();
      this.userService.set2faCode(user.id, hashed);
      this.mailService.send2faCode(user.email, user.firstName, code);
    }

    return { is2faEnabled: user.twoFactorAuthToggle, patient };
  }

  async validateGoogleUser(email: string, googleId: string): Promise<ResponseWithoutRelationsUserDto | null> {
    const user = await this.userService.getUserWithSecretsByEmail(email);
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

  async getMePatient(user?: ResponseWithoutRelationsUserDto): Promise<GetMePatientResponseDto> {
    if (!user) throw new UnauthorizedException();
    const patient = await this.patientService.getPatientByUserId(user.id);

    return plainToInstance(GetMePatientResponseDto, {
      ...plainToInstance(ResponseWithoutRelationsUserDto, user),
      ...plainToInstance(ResponsePatientDto, patient),
      userId: user.id,
      patientId: patient.id,
    });
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

  async verify2fa(body: TwoFactorAuthDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.userService.getUserWithSecretsByEmail(body.email);
    if (!user) throw new BadRequestException('User not found');
    if (!user.twoFactorAuthToggle) throw new BadRequestException('2FA not enabled');

    const isValidPassword = await this.verifyPassword(body.password, user.password);
    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    const isValidCode = await this.verify2faCode(body.code, user.secretCode);
    if (!isValidCode) throw new BadRequestException('Invalid credentials');
    this.userService.set2faCode(user.id, null);

    return user;
  }

  async changePassword(user: ResponseWithoutRelationsUserDto, body: ChangePasswordDto): Promise<void> {
    const { password } = await this.userService.getUserWithSecretsByEmail(user.email);
    const isPasswordValid = await this.verifyPassword(body.oldPassword, password);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    await this.userService.patchUser(user.id, {
      password: await this.hashPassword(body.newPassword),
    });
  }

  private async signUpUserWithPassword(body: AuthSignUpUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const existingUser: ResponseWithoutRelationsUserDto | null = await this.userService
      .getUserByEmail(body.email)
      .catch(() => null);
    if (existingUser) {
      if (existingUser.emailVerified) throw new BadRequestException('User already exists');

      const token = await this.jwtService.signAsync({ sub: existingUser.id }, { expiresIn: '1d' });
      this.mailService.sendPatientSignUpMail(existingUser.email, existingUser.firstName, token);

      return existingUser;
    }

    const password = await this.hashPassword(body.password);

    // TODO: Create private function for this.
    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      googleId: body.googleId,
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

    // TODO: Create private function for this.
    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      googleId: body.googleId,
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

  private async get2faCode(): Promise<{ code: string; hashed: string }> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed = await bcrypt.hash(code, 10);

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    return { code, hashed: `${hashed}:separator:${expirationTime.toISOString()}` };
  }

  private async verify2faCode(code: string, hashed: string): Promise<boolean> {
    const [hash, expiration] = hashed.split(':separator:');
    if (!hash || !expiration) return false;

    const isValid = await bcrypt.compare(code, hash);
    if (!isValid) return false;

    const expirationTime = new Date(Date.parse(expiration));
    const now = new Date();
    if (expirationTime < now) return false;

    return true;
  }
}
