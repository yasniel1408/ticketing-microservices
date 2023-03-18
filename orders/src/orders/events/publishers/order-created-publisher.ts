import {
    BasePublisher,
    OrderCreatedEvent,
    OrderSubjects,
} from "@common-ticketing-microservices/common";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  readonly subject = OrderSubjects.OrderCreated;
}
