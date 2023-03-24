import mongoose, { Types } from "mongoose";
import { OrderStatus } from "@common-ticketing-microservices/common";

export interface OrderDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  status: OrderStatus;
  userId: string;
  price: number;
  version?: number;
}
