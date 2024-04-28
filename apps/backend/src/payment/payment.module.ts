import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService, PrismaService],
})
export class PaymentModule {}
