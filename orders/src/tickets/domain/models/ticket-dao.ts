import mongoose, { Schema } from "mongoose";
import { TicketDto } from "./ticket-dto";
import { TicketDocument } from "./ticket-document";

interface TicketModel extends mongoose.Model<TicketDocument> {}

const ticketSchema = new Schema<TicketDto>(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const TicketDao = mongoose.model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);

export { TicketDao };
