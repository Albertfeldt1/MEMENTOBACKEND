// notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
  
  @Prop()
  type:string

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);