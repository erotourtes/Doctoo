import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  exports: [DoctorService]
})
export class DoctorModule {}
