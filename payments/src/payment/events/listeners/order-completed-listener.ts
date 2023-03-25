import {
  BaseListener,
  OrderCompletedEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";
import { Message } from "node-nats-streaming";
import { ChangeStatusOrderToCreatedService } from "@app/orders/usecases";
import { queueGroupName } from "./constants";

class OrderCompletedListener extends BaseListener<OrderCompletedEvent> {
  subject: OrderSubjects.OrderCompleted = OrderSubjects.OrderCompleted;
  queueGroupName: string = queueGroupName;
  durableName: string = "ticket-service-order-completed";

  async onMessage(
    data: OrderCompletedEvent["data"],
    msg: Message
  ): Promise<void> {
    await ChangeStatusOrderToCreatedService.changeStatusToCreated({
      id: data.id,
      version: data.version,
    });

    msg.ack();
  }
}

export default OrderCompletedListener;
