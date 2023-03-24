import {
  BaseListener,
  OrderCreatedEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";
import { queueGroupName } from "./constants";
import { Message } from "node-nats-streaming";
import { CreateOrderService } from "@app/orders/usecases";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: OrderSubjects.OrderCreated = OrderSubjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  durableName: string = "payments-service-order-created";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    await CreateOrderService.create({
      id: data.id,
      price: data.ticket.price.valueOf(),
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    msg.ack();
  }
}

export default OrderCreatedListener;
