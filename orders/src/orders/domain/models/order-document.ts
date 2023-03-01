import mongoose, { Types } from "mongoose";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";

export interface OrderDocument extends mongoose.Document {
  _id?: Types.ObjectId;
  status: string;
  expiresAt: Date;
  userId: string;
  ticket: TicketDocument;
  __v?: number;
}
