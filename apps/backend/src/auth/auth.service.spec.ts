import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import authConfig from 'src/config/auth-config';
import config from 'src/config/config';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  const userMock: Partial<UserService> = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userMock },
        JwtService,
        { provide: ConfigService, useValue: config },
        { provide: ConfigService, useValue: authConfig },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should signup user', async () => {
    authService.signupUser({
      avatar_key: '',
      email: 'user@gmail.com',
      first_name: 'user',
      last_name: 'user',
      password: 'password',
      email_verified: false,
      phone: '1234567890',
      google_id: null,
    });
  });
});
