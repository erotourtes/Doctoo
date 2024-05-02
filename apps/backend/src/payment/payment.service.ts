import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), { apiVersion: '2024-04-10' });
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const total = createPaymentDto.appointmentDuration * createPaymentDto.pricePerHour * 100;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: total,
      currency: 'USD',
    });

    return paymentIntent;
  }
}
