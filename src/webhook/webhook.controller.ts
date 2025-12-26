import {
  Controller,
  Headers,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Req() req: any,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    try {

      console.log(req.body,'====>>body')

      const result = await this.webhookService.handleStripeWebhook(
        signature,
        req.body, // 🔥 RAW BODY
      );

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}
