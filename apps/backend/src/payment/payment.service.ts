import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), { apiVersion: '2024-04-10' });
  }

  private stripe: Stripe;

  async createPayment(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const appointment = await this.prismaService.appointment.findUnique({ where: { id }, include: { doctor: true } });

    const duration = new Date(appointment.endedAt).getTime() - new Date(appointment.startedAt).getTime();

    const amount = duration * appointment.doctor.payrate * 100;

    // TODO: We must take default currency which user have in country.
    const payment = await this.stripe.paymentIntents.create({ amount, currency: 'USD' });

    return payment;
  }
}
