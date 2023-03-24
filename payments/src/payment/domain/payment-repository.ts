import { CRUDRepository } from "@common-ticketing-microservices/common";
import mongoose, { Types } from "mongoose";
import { PaymentDto } from "./models/payment-dto";
import { PaymentDocument } from "./models/payment-document";
import { PaymentDao } from "./models/payment-dao";

class PaymentRepository {
  async findByOrderIdAndStripeId(
    orderId: string,
    stripeId: string
  ): Promise<PaymentDocument | null> {
    const payment = await PaymentDao.findOne({
      orderId,
      stripeId,
    }).exec();
    return payment;
  }
}

export default new PaymentRepository();
