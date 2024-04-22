import { Test, TestingModule } from '@nestjs/testing';
import { DeclarationController } from './declaration.controller';
import { DeclarationService } from './declaration.service';

describe('DeclarationController', () => {
  let controller: DeclarationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeclarationController],
      providers: [DeclarationService],
    }).compile();

    controller = module.get<DeclarationController>(DeclarationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
