import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { getOrThrow } from '../config/utils';

@Injectable()
export class PaymentService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(getOrThrow('STRIPE_API_KEY'), {
      apiVersion: '2024-04-10',
    });
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
