import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  product: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  @Prop({ default: 1 })
  totalItems: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
