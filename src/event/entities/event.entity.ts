import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  
  @Prop({type: Types.ObjectId,ref:'User'})
  userId: Types.ObjectId

  @Prop({ trim: true })
  title: string;

  @Prop({ trim: true })
  image: string;

  @Prop({})
  date: Date;

  @Prop({})
  time: string; 

  @Prop({ trim: true })
  location: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
