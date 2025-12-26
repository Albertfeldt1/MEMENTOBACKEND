import { WebhookService } from './webhook.service';
import { Response } from 'express';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    handleStripeWebhook(req: any, res: Response, signature: string): Promise<Response<any, Record<string, any>>>;
}
