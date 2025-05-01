import { Schema } from 'mongoose';

export const TrainerSchema = new Schema(
  {
    _id: { type: String },
    name: String,
    position: String,
    baseSalary: Number,
    netSalary: Number,
    history: [
      {
        discounts: Number,
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
