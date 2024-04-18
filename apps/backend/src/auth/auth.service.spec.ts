import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import authConfig from 'src/config/auth-config';
import config from 'src/config/config';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  const userServiceMock: Partial<UserService> = {};
  let user: CreateUserDto;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: config.KEY, useValue: config },
        { provide: authConfig.KEY, useValue: authConfig },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);

    user = {
      avatar_key: '',
      email: 'user@gmail.com',
      first_name: 'user',
      last_name: 'user',
      password: 'password',
      email_verified: false,
      phone: '1234567890',
      google_id: null,
    };
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should signup user', async () => {
    userServiceMock.createUser = jest.fn().mockResolvedValue({
      ...user,
      id: '1',
    });

    const signedUp = await authService.signupUser(user);

    expect(userServiceMock.createUser).toHaveBeenCalledWith({
      ...user,
      password: expect.not.stringMatching(user.password),
    });
    expect(signedUp).toEqual({ ...user, id: '1' });
  });

  it("should validate user's credentials", async () => {
    const pass = bcrypt.hashSync(user.password, 10);
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue({
      ...user,
      password: pass,
    });
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue({
      ...user,
      password: pass,
    });

    const validated = await authService.validateUser(user.email, user.password);

    expect(validated).toEqual({ ...user, password: pass });
  });

  it("should not validate user's credentials", async () => {
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue(user);
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateUser(user.email, 'not valid password');

    expect(validated).toBeNull();
  });

  it('should validate google user', async () => {
    user = { ...user, google_id: 'google_id' };
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateGoogleUser(user.email, 'google_id');

    expect(validated).toEqual(user);
  });

  it('should not validate google user', async () => {
    user = { ...user, google_id: 'google_id' };
    userServiceMock.findUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateGoogleUser(user.email, 'google_id_wrong');

    expect(validated).toBeNull();
  });

  it('should signup user with valid google_id', async () => {
    userServiceMock.createUser = jest.fn().mockResolvedValue(user);
    let newUser = { ...user, google_id: await authService.signGoogleId('google_id'), password: null };

    expect(authService.signupUser(newUser)).resolves.toEqual(user);
  });

  it('should not signup user without valid google_id', async () => {
    user = { ...user, google_id: 'google_id', password: null };

    expect(authService.signupUser(user)).rejects.toThrow();
  });

  it('should attach jwt token to cookie', () => {
    const res = { cookie: jest.fn() } as any;
    authService.attachJwtTokenToCookie(res, 'token');

    expect(res.cookie).toHaveBeenCalledWith(AuthService.JWT_COOKIE_NAME, 'token', expect.any(Object));
  });
});
