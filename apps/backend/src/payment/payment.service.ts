import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), { apiVersion: '2024-04-10' });
  }

  async createPayment(body: CreatePaymentDto): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const total = body.appointmentDuration * body.pricePerHour * 100;

    try {
      const payment = await this.stripe.paymentIntents.create({ amount: total, currency: 'USD' });

      return payment;
    } catch (err) {
      console.error(err);

      throw new BadRequestException('Something bad happened during creating payment.');
    }
  }
}
