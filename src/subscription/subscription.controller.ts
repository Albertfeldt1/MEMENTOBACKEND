import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("subscription")
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly i18n: I18nService
  ) {}
  @Post("seed")
  async seedSubscriptions() {
    const result = await this.subscriptionService.insertManySubscriptions();

    return {
      statusCode: 201,
      message: result.message,
      data: result,
    };
  }
  @Post()
  async create(
    @Request() req: any,
    @Body() createSubscriptionDto: CreateSubscriptionDto
  ) {
    const data = await this.subscriptionService.create(createSubscriptionDto);

    return {
      statusCode: 201,
      message: "Subscription created successfully",
      data,
    };
  }

  @Get()
  async findAll(@Request() req: any,@Query('billingCycle') billingCycle: string
) {
    const data = await this.subscriptionService.findAll(billingCycle);

    return {
      statusCode: 200,
      message: await this.i18n.translate(`common.SUBSCRIPTIONS_FETCHED`),
      data,
    };
  }

  @Get(":id")
  async findOne(@Request() req: any, @Param("id") id: string) {
    const data = await this.subscriptionService.findOne(id);

    return {
      statusCode: 200,
      message: "Subscription fetched successfully",
      data,
    };
  }

  @Patch(":id")
  async update(
    @Request() req: any,
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    const data = await this.subscriptionService.update(
      id,
      updateSubscriptionDto
    );

    return {
      statusCode: 200,
      message: "Subscription updated successfully",
      data,
    };
  }

  @Delete(":id")
  async remove(@Request() req: any, @Param("id") id: string) {
    const data = await this.subscriptionService.remove(id, req.user.userId);

    return {
      statusCode: 200,
      message: "Subscription deleted successfully",
      data,
    };
  }
}
