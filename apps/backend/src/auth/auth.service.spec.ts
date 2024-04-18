import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import authConfig from 'src/config/auth-config';
import config from 'src/config/config';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreatePatientDto } from 'src/patient/dto/create.dto';
import { plainToClass } from 'class-transformer';
import { PatientService } from 'src/patient/patient.service';

describe('AuthService', () => {
  let authService: AuthService;
  const userServiceMock: Partial<UserService> = {};
  const patientServiceMock: Partial<PatientService> = {};
  let user: CreateUserDto;
  let patient: CreatePatientDto;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
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
    patient = plainToClass(CreatePatientDto, {});
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should signup user', async () => {
    userServiceMock.createUser = jest.fn().mockResolvedValue({ ...user, id: '1' });
    patientServiceMock.createPatient = jest.fn().mockResolvedValue({ ...patient, id: '2' });
    const signUpDto = { ...user, ...patient };

    const signedUp = await authService.signupUser(signUpDto);

    expect(userServiceMock.createUser).toHaveBeenCalledWith({
      ...user,
      password: expect.not.stringMatching(user.password),
    });
    expect(patientServiceMock.createPatient).toHaveBeenCalledWith(
      expect.objectContaining({ ...patient, user_id: '1' }),
    );
    expect(signedUp).toEqual({ ...patient, id: '2' });
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
    patientServiceMock.createPatient = jest.fn().mockResolvedValue(patient);
    let newUser = { ...user, google_id: await authService.signGoogleId('google_id'), password: null };
    let signUpDto = { ...newUser, ...patient };

    expect(authService.signupUser(signUpDto)).resolves.toEqual({
      ...patient,
    });
  });

  it('should not signup user without valid google_id', async () => {
    user = { ...user, google_id: 'google_id', password: null };
    let signUpDto = { ...user, ...patient };

    expect(authService.signupUser(signUpDto)).rejects.toThrow();
  });

  it('should attach jwt token to cookie', () => {
    const res = { cookie: jest.fn() } as any;
    authService.attachJwtTokenToCookie(res, 'token');

    expect(res.cookie).toHaveBeenCalledWith(AuthService.JWT_COOKIE_NAME, 'token', expect.any(Object));
  });
});
