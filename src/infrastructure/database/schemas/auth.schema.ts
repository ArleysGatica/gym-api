import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class UserDocument extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(UserDocument);
