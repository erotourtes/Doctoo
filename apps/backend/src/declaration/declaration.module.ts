import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DeclarationController],
  providers: [DeclarationService, PrismaService],
})
export class DeclarationModule {}
