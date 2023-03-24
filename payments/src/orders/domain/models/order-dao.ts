import mongoose, { Schema } from "mongoose";
import { OrderDto } from "./order-dto";
import { OrderDocument } from "./order-document";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderModel extends mongoose.Model<OrderDocument> {}

const orderSchema = new Schema<OrderDto>(
  {
    status: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

const OrderDao = mongoose.model<OrderDocument, OrderModel>(
  "Order",
  orderSchema
);

export { OrderDao };
