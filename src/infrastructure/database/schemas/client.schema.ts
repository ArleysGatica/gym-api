import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class ClientDocument extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  nextPayment: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  daysOverdue: number;

  @Prop({ required: true })
  daysRemaining: number;

  @Prop({ required: true })
  paymentAmount: number;
}

export const ClientSchema = SchemaFactory.createForClass(ClientDocument);
