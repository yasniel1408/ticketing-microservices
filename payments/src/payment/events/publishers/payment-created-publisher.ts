import {
  BasePublisher,
  PaymentCreatedEvent,
  PaymentSubjects,
} from "@common-ticketing-microservices/common";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  subject: PaymentSubjects = PaymentSubjects.PaymentCreated;
}
