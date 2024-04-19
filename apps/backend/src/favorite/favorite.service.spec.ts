import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService, PrismaService],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
