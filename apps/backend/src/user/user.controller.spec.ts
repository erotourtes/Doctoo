import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a new user', async () => {
    const user = await controller.createUser({
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'example@mail.com',
      phone: '+380501804050',
      email_verified: true,
      avatar_key: 'ABCD-DEFG',
      password: '$2y$10$rcDPr0lHPIa4iwZeZWunBeamx7ruC.g0hFl9QrEEARRaAQpRX3MhC',
    });

    userId = user.id;

    expect(user).toMatchObject({ first_name: 'First Name', last_name: 'Last Name' });
  });

  it('Should change first_name to "New First Name"', async () => {
    const user = await controller.patchUser(userId, { first_name: 'New First Name' });

    expect(user).toMatchObject({ first_name: 'New First Name' });
  });

  it('Should return user object', async () => {
    const user = await controller.getUser(userId);

    console.log(Object.keys(user));

    expect(Object.keys(user).length).toBe(6);
  });

  it('Should deleted user', async () => {
    const user = await controller.deleteUser(userId);

    expect(user).toBeUndefined();
  });
});
