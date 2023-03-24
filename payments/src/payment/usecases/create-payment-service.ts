import { PaymentDto } from "@app/payment/domain/models/payment-dto";
import { PaymentCrudRepository } from "@app/payment/domain";
import { PaymentDocument } from "@app/payment/domain/models/payment-document";

class CreatePaymentService {
  async create(payment: PaymentDto): Promise<PaymentDocument> {
    const paymentCreated = await PaymentCrudRepository.create(payment);
    return paymentCreated;
  }
}

export default new CreatePaymentService();
