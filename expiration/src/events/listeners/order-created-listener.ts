import {
  BaseListener,
  OrderCreatedEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";
import { queueGroupName } from "./constants";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "@app/queues/expiration-queue";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: OrderSubjects.OrderCreated = OrderSubjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  durableName: string = "expiration-service-order-created";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job:", delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: 60000, // 60 segundos
      }
    );

    msg.ack();
  }
}

export default OrderCreatedListener;
