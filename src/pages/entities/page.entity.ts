import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class Page extends Document {

    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    type: string;

    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Prop({ type: String })
    @IsString()
    @IsOptional()
    description?: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
