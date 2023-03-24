import mongoose, { Types } from "mongoose";

export interface PaymentDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  orderId: string;
  stripeId: string;
}
