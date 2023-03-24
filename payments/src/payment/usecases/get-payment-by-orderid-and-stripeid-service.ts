import { PaymentDto } from "@app/payment/domain/models/payment-dto";
import { PaymentRepository } from "@app/payment/domain";
import { PaymentDocument } from "@app/payment/domain/models/payment-document";

class GetPaymentByOrderIdAndStripeIdService {
  async get(paymentDto: PaymentDto): Promise<PaymentDocument | null> {
    const payment = await PaymentRepository.findByOrderIdAndStripeId(
      paymentDto.orderId,
      paymentDto.stripeId
    );
    return payment;
  }
}

export default new GetPaymentByOrderIdAndStripeIdService();
