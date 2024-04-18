import { prismaMock } from './mocks/prisma/prisma.mock';

jest.mock('./prisma.service.ts', () => ({
  PrismaService: jest.fn(() => prismaMock),
}));
