import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import auth from '../config/auth';
import { MailService } from '../mail/mail.service';
import { MinioService } from '../minio/minio.service';
import { ResponsePatientDto } from '../patient/dto/response.dto';
import { PatientService } from '../patient/patient.service';
import { ResponseUserDto } from '../user/dto/response.dto';
import { JwtEmailPayload, UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { LocalLoginTwoFactorDto } from './dto/localLoginTwoFactor.dto';
import { SignUpPatientDto } from './dto/signUpPatient.dto';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { JwtPayload } from './strategies/jwt';

// TODO: refactor this service;
// there are 3 concerns to consider:
// 1. Local auth
// 2. Google auth
// 3. Helper functions for password hashing, password verification, MFA code generation and verification

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly minioService: MinioService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    @Inject(auth.KEY) private readonly authObject: ConfigType<typeof auth>,
  ) {}

  async signUpPatient(body: SignUpPatientDto, token: string): Promise<ResponsePatientDto> {
    let verified: JwtPayload;

    try {
      verified = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (err) {
      throw new BadRequestException();
    }

    const patient = await this.patientService.createPatient({ ...body, userId: verified.sub });

    await this.userService.updateEmailVerifiedStatus(verified.sub, true);

    return plainToInstance(ResponsePatientDto, patient);
  }

  async signUpUser(body: SignUpUserDto): Promise<ResponseUserDto> {
    if (body.password) {
      const user = await this.signUpUserWithPassword(body);

      return plainToInstance(ResponseUserDto, user);
    }

    throw new BadRequestException();
  }

  async signUpUserWithGoogle(body: SignUpUserDto): Promise<ResponseUserDto> {
    if (body.googleId) return await this.signUpUserWithGoogleId(body);

    throw new BadRequestException();
  }

  async validatePatientByEmail(
    email: string,
    password: string,
  ): Promise<{ isMFAEnabled: boolean; patient: ResponsePatientDto | null }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) return { isMFAEnabled: false, patient: null };

    if (user.emailVerified && !user.password) {
      throw new BadRequestException("You've signed up with Google, please use Google Sign In and then set a password.");
    }

    const isValidPassword = await this.verifyPassword(password, user.password);

    if (!isValidPassword) return { isMFAEnabled: false, patient: null };

    const patient = await this.patientService.getPatientByUserId(user.id);

    if (patient.twoFactorAuthToggle) {
      const { code, hashed } = await this.getMFACode();

      this.userService.updateSecretCode(user.id, hashed);
      this.mailService.sendMFACode(user.email, user.firstName, code);
    }

    return { isMFAEnabled: patient.twoFactorAuthToggle, patient };
  }

  async validateGoogleUser(email: string, googleId: string): Promise<ResponseUserDto | null> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) return null;

    const patient = await this.patientService.getPatientByUserId(user.id);

    if (!patient) return null;

    if (user.googleId && user.googleId === googleId) return user;

    if (!user.googleId) {
      await this.userService.patchUser(user.id, { googleId });

      return user;
    }

    throw new BadRequestException();
  }

  async signJwtToken(id: string): Promise<string> {
    const payload: JwtPayload = { sub: id };

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return accessToken;
  }

  async getMePatient(user?: ResponseUserDto): Promise<ResponsePatientDto> {
    if (!user) throw new UnauthorizedException();

    const patient = await this.patientService.getPatientByUserId(user.id);

    return patient;
  }

  jwtCloseToExpire(token: string): boolean {
    const payload = this.jwtService.decode<JwtPayload & { exp: number }>(token);

    if (!payload || !payload.sub || !payload.exp) return false;

    // payload.exp => seconds
    const intervalLeft = payload.exp - Date.now() / 1000;

    if (intervalLeft < 0) return false;

    const isCloseToExpire = intervalLeft < this.authObject.JWT_EXPIRATION_TRESHOLD_SECONDS;

    return isCloseToExpire;
  }

  async verifyMFA(body: LocalLoginTwoFactorDto): Promise<ResponseUserDto> {
    const user = await this.userService.getUserByEmail(body.email);

    if (!user) throw new BadRequestException('Requested user not found.');

    const patient = await this.patientService.getPatientByUserId(user.id);
    if (!patient.twoFactorAuthToggle) throw new BadRequestException('MFA is not enabled for this user.');

    const isValidPassword = await this.verifyPassword(body.password, user.password);

    if (!isValidPassword) throw new BadRequestException('Invalid auth credentials.');

    const isValidCode = await this.verifyMFACode(body.code, user.secretCode);

    if (!isValidCode) throw new BadRequestException('Invalid auth credentials.');

    await this.userService.updateSecretCode(user.id, null);

    return user;
  }

  async changeEmail(user: ResponseUserDto, token: string): Promise<void> {
    const verified = await this.jwtService.verifyAsync<JwtEmailPayload>(token).catch(() => {
      throw new BadRequestException('Invalid token.');
    });
    const { sub, newEmail } = verified;
    if (sub !== user.id) throw new BadRequestException('Token is not valid for this user.');
    if (!newEmail) throw new BadRequestException('Invalid token.');

    await this.userService.changeEmail(user.id, newEmail);
  }

  async changePassword(user: ResponseUserDto, body: ChangePasswordDto): Promise<void> {
    const { password } = await this.userService.getUserByEmail(user.email);

    if (password) {
      const isPasswordValid = await this.verifyPassword(body.oldPassword, password);

      if (!isPasswordValid) throw new BadRequestException('Old password is not correct.');
    }

    const hashedPassword = await this.hashPassword(body.newPassword);

    await this.userService.patchUser(user.id, { password: hashedPassword });
  }

  private async signUpUserWithPassword(body: SignUpUserDto): Promise<ResponseUserDto> {
    const existingUser: User = await this.userService.getUserByEmail(body.email);

    if (existingUser) {
      if (existingUser.emailVerified) throw new BadRequestException('Requested user already exists.');

      const token = await this.jwtService.signAsync({ sub: existingUser.id }, { expiresIn: '1d' });

      await this.mailService.sendPatientSignUpMail(existingUser.email, existingUser.firstName, token);

      return plainToInstance(ResponseUserDto, existingUser);
    }

    const password = await this.hashPassword(body.password);

    const data = Object.assign(body, { password });

    const user = await this.createUser(data);

    try {
      const imageUrl = body?.avatarImgUrl ?? 'https://storage.googleapis.com/doctoo/user.png';

      const { name } = await this.minioService.uploadByUrl(imageUrl);

      await this.userService.patchUser(user.id, { avatarKey: name });
    } catch (err) {}

    const token = await this.jwtService.signAsync({ sub: user.id }, { expiresIn: '1d' });

    this.mailService.sendPatientSignUpMail(user.email, user.firstName, token);

    return plainToInstance(ResponseUserDto, user);
  }

  private async signUpUserWithGoogleId(body: SignUpUserDto): Promise<ResponseUserDto> {
    const isUserExists: User = await this.userService.getUserByEmail(body.email);

    if (isUserExists) {
      if (isUserExists.emailVerified) throw new BadRequestException('Requested user already exists.');

      return plainToInstance(ResponseUserDto, isUserExists);
    }

    const user = await this.userService.createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      googleId: body.googleId,
      avatarKey: '',
      role: body.role,
    });

    try {
      const imageUrl = body?.avatarImgUrl ?? 'https://storage.googleapis.com/doctoo/user.png';

      const { name } = await this.minioService.uploadByUrl(imageUrl);

      await this.userService.patchUser(user.id, { avatarKey: name });
    } catch (err) {}

    return plainToInstance(ResponseUserDto, user);
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

  private async getMFACode(): Promise<{ code: string; hashed: string }> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed = await bcrypt.hash(code, 10);

    const expirationTime = new Date();

    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    return { code, hashed: `${hashed}:separator:${expirationTime.toISOString()}` };
  }

  private async verifyMFACode(code: string, hashed: string): Promise<boolean> {
    const [hash, expiration] = hashed.split(':separator:');

    if (!hash || !expiration) return false;

    const isValid = await bcrypt.compare(code, hash);

    if (!isValid) return false;

    if (new Date(Date.parse(expiration)) < new Date()) return false;

    return true;
  }

  private async createUser(body: SignUpUserDto): Promise<ResponseUserDto> {
    const { email, firstName, lastName, phone, googleId, password, role } = body;

    const user = await this.userService.createUser({
      email,
      firstName,
      lastName,
      phone,
      googleId,
      ...(password ? { password } : {}),
      avatarKey: '',
      role,
    });

    return plainToInstance(ResponseUserDto, user);
  }
}
