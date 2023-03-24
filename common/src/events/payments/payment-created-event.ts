import BaseEvent from "../base-event";
import PaymentSubjects from "./order-subjects";

export default interface PaymentCreatedEvent extends BaseEvent {
  subject: PaymentSubjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
