import {
  BasePublisher,
  OrderCompletedEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";

export class OrderCompletedPublisher extends BasePublisher<OrderCompletedEvent> {
    readonly subject = OrderSubjects.OrderCompleted;
}
