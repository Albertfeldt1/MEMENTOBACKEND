import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // Admin: Create Stripe Product
  @Post("product")
  async createProduct(@Body() body: { name: string; description?: string }) {
    const data = await this.stripeService.createProduct(body.name, body.description);
    const response = {
      statusCode:HttpStatus?.OK,
      message:"Product created successfully",
      data
    }
    return response;
  }
  // Admin: Create Stripe Price
  @Post("price")
  async createPrice(
    @Body()
    body: {
    planName: string,
    amount: number;
    interval: "month" | "year";
    description:string;
    stripeCustomerId:string;
    startSubscriptionDate:string;
    endSubscriptionDate:string;
    subscriptionPlan:string
    }
  ) {
    const data = await this.stripeService.createPrice(
      body.planName,
      body.amount,
      body.interval,
      body.description,
      body.stripeCustomerId,
      body.startSubscriptionDate,
      body.endSubscriptionDate,
      body.subscriptionPlan
    );
    const response = {
      statusCode:HttpStatus?.OK,
      message:"Price Created successfully",
      data
    }
    return response
  }

  @UseGuards(JwtAuthGuard)
  @Post("checkout")
  async checkout(@Request() req, @Body("priceId") priceId: string) {
    return this.stripeService.createCheckoutSession(req.user.userId, priceId);
  }

  // Get Subscription Details
  @Get("subscription")
  async getSubscription(@Query("id") id: string) {
    return this.stripeService.retrieveSubscription(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("customer")
  async createCustomer(@Request() req) {
   
     const customerId = await this.stripeService.createCustomerForUser(
        req.user.userId)
        const response ={
          statusCode: HttpStatus?.OK,
          message:"Customer Id is created",
          data:customerId
        } 
        return response;
    };
  }

