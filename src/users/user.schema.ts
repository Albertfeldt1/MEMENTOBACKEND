import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Date })
  @IsDate()
  dob: Date;

  @Prop()
  @IsString()
  @IsNotEmpty()
  socialId: string;

  @Prop({ required: false })
  device_type?: string;

  @Prop({ default: false })
  isSubscriptionActive?: boolean;

  @Prop({ required: false })
  device_token?: string;

  @Prop({ required: false })
  password: string;

  @Prop({ default: true })
  isNotification: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
