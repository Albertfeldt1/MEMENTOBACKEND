import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class EventReminder {
  @Prop({ type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fireAt: Date;

  @Prop({ default: false })
  isSent: boolean;

  @Prop()
  type: string; // "1_month", "1_week", "1_day", "1_hour", "1_min"
}
export const EventReminderSchema = SchemaFactory.createForClass(EventReminder);
