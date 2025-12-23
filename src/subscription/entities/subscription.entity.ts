import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  planName: string; 

  @Prop({ required: true })
  language: string; 

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'yearly' })
  billingCycle: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  features: string[];
}

export const SubscriptionSchema =
  SchemaFactory.createForClass(Subscription);
