import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    create(createWebhookDto: CreateWebhookDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWebhookDto: UpdateWebhookDto): string;
    remove(id: string): string;
}
