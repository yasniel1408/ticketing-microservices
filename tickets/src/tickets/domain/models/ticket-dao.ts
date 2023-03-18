import mongoose, {Schema} from "mongoose";
import {TicketDto} from "./ticket-dto";
import {TicketDocument} from "./ticket-document";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

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
    },
    userId: {
      type: String,
      require: true,
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

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

const TicketDao = mongoose.model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);

export { TicketDao };
