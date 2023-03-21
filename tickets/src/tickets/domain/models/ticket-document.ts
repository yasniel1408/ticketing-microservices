import mongoose, { Types } from "mongoose";

export interface TicketDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  title: string;
  price: Number;
  userId: string;
  orderId?: string;
  version?: number;
}
