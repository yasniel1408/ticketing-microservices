import mongoose, { Schema } from "mongoose";
import { OrderDto } from "./order-dto";
import { OrderDocument } from "./order-document";
import { OrderStatus } from "@common-ticketing-microservices/common";

interface OrderModel extends mongoose.Model<OrderDocument> {}

const orderSchema = new Schema<OrderDto>(
  {
    status: {
      type: String,
      require: true,
      unique: true,
      enum: Object.values(OrderStatus), // de esta manera usamos enums para los datos de
      default: OrderStatus.Created, // Le podemos pasar un valos por defecto de los valores del enum
    },
    expiresAt: {
      type: Date,
    },
    userId: {
      type: String,
      require: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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

const OrderDao = mongoose.model<OrderDocument, OrderModel>(
  "Order",
  orderSchema
);

export { OrderDao };
