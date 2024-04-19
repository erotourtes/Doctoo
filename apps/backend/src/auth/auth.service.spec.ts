import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import auth from '../config/auth';
import config from '../config/config';
import { CreatePatientDto } from '../patient/dto/create.dto';
import { PatientService } from '../patient/patient.service';
import { CreateUserDto } from '../user/dto/create.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let user: CreateUserDto;
  let patient: CreatePatientDto;

  const userServiceMock: Partial<UserService> = {};
  const patientServiceMock: Partial<PatientService> = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: config.KEY, useValue: config },
        { provide: auth.KEY, useValue: auth },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);

    user = plainToInstance(CreateUserDto, {
      avatarKey: 'key',
      email: 'user@gmail.com',
      firstName: 'First Name',
      lastName: 'Last Name',
      password: 'password',
      emailVerified: false,
      phone: '+380501804066',
      googleId: null,
    });

    patient = plainToClass(CreatePatientDto, {});
  });

  it('Should be defined', () => expect(authService).toBeDefined());

  it('Should signup', async () => {
    userServiceMock.createUser = jest.fn().mockResolvedValue({ ...user, id: '1' });
    patientServiceMock.createPatient = jest.fn().mockResolvedValue({ ...patient, id: '2' });

    const signUpDto = { ...user, ...patient };

    const signedUp = await authService.signUpUser(signUpDto);

    expect(userServiceMock.createUser).toHaveBeenCalledWith({
      ...user,
      password: expect.not.stringMatching(user.password),
    });
    expect(patientServiceMock.createPatient).toHaveBeenCalledWith(expect.objectContaining({ ...patient, userId: '1' }));
    expect(signedUp).toEqual({ ...patient, id: '2' });
  });

  // TODO: Fix this test, user does notreturn password.
  it('Should validate credentials', async () => {
    const pass = bcrypt.hashSync(user.password, 10);

    userServiceMock.getUserByEmail = jest.fn().mockResolvedValue({
      ...user,
      password: pass,
    });

    userServiceMock.getUserByEmail = jest.fn().mockResolvedValue({
      ...user,
      password: pass,
    });

    const validated = await authService.validateUser(user.email, user.password);

    expect(validated).toEqual({ ...user, password: pass });
  });

  it('Should fail credentials validation', async () => {
    userServiceMock.getUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateUser(user.email, 'invalid_password');

    expect(validated).toBeNull();
  });

  // TODO: Fix this test, user does notreturn password.
  it('Should validate Google', async () => {
    user = { ...user, googleId: 'googleId' };

    userServiceMock.getUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateGoogleUser(user.email, 'googleId');

    expect(validated).toEqual(user);
  });

  it('Should fail Google validation', async () => {
    user = { ...user, googleId: 'googleId' };

    userServiceMock.getUserByEmail = jest.fn().mockResolvedValue(user);

    const validated = await authService.validateGoogleUser(user.email, 'invalid_googleId');

    expect(validated).toBeNull();
  });

  it('Should signup with valid googleId', async () => {
    userServiceMock.createUser = jest.fn().mockResolvedValue(user);
    patientServiceMock.createPatient = jest.fn().mockResolvedValue(patient);

    const googleId = await authService.signGoogleId('googleId');

    const newUser = { ...user, googleId, password: null };
    const signUpDto = { ...newUser, ...patient };

    expect(authService.signUpUser(signUpDto)).resolves.toEqual({ ...patient });
  });

  it('Should fail signup without valid googleId', async () => {
    user = { ...user, googleId: 'googleId', password: null };

    const signUpDto = { ...user, ...patient };

    expect(authService.signUpUser(signUpDto)).rejects.toThrow();
  });

  it('Should attach JWT token to cookie', () => {
    const res = { cookie: jest.fn() } as any; // TODO: Remove any.

    authService.attachJwtTokenToCookie(res, 'token');

    expect(res.cookie).toHaveBeenCalledWith(AuthService.JWT_COOKIE_NAME, 'token', expect.any(Object));
  });
});
