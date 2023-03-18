import {
    BasePublisher,
    OrderCancelledEvent,
    OrderSubjects,
} from "@common-ticketing-microservices/common";

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
    readonly subject = OrderSubjects.OrderCancelled;
}
