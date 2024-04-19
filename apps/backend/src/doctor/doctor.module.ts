import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [UserModule],
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  exports: [DoctorService],
})
export class DoctorModule {}
