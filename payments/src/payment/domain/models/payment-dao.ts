import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { PaymentDocument } from "./payment-document";
import { PaymentDto } from "./payment-dto";

interface PaymentModel extends mongoose.Model<PaymentDocument> {}

const orderSchema = new Schema<PaymentDto>(
  {
    orderId: {
      type: String,
      require: true,
    },
    stripeId: {
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

const PaymentDao = mongoose.model<PaymentDocument, PaymentModel>(
  "Payment",
  orderSchema
);

export { PaymentDao };
