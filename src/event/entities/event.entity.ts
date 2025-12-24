import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  
  @Prop({type: Types.ObjectId,ref:'User'})
  userId: Types.ObjectId

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  image: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string; // e.g. "10:30 AM"

  @Prop({ required: true, trim: true })
  location: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
