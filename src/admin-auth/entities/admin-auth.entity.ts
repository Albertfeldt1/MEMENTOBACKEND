import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminAuthDocument = AdminAuth & Document;

@Schema({ timestamps: true })
export class AdminAuth {

  @Prop()
  image: string;
  
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

}

export const AdminAuthSchema = SchemaFactory.createForClass(AdminAuth);
