import { Schema } from 'mongoose';

export const ClientSchema = new Schema(
  {
    _id: { type: String }, // 👈 esto es clave
    name: String,
    email: String,
    phone: String,
    gender: String,
    startDate: Date,
    nextPayment: Date,
    status: String,
  },
  {
    _id: false, // opcional: si NO quieres que Mongoose autogenere ObjectId
    timestamps: true,
  },
);
