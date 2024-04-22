import { Test, TestingModule } from '@nestjs/testing';
import { DeclarationService } from './declaration.service';

describe('DeclarationService', () => {
  let service: DeclarationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeclarationService],
    }).compile();

    service = module.get<DeclarationService>(DeclarationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
