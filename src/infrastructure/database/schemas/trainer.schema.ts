import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class TrainerDocument extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  baseSalary: number;

  @Prop({ required: true })
  netSalary: number;

  @Prop({ required: true })
  history: {
    discounts: number;
    reason: string;
  }[];
}

export const TrainerSchema = SchemaFactory.createForClass(TrainerDocument);
