import mongoose, { Types } from "mongoose";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { OrderStatus } from "@common-ticketing-microservices/common";

export interface OrderDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  ticket: TicketDocument;
  __v?: number;
}
