import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payment (stripe)')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Get a payment intent',
    description: 'This endpoint return payment intent from stripe api',
  })
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({ type: CreatePaymentDto, description: 'Get payment intent' })
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentService.createPayment(createPaymentDto);
    } catch (error) {
      throw new Error('An error occurred while processing the payment');
    }
  }
}
