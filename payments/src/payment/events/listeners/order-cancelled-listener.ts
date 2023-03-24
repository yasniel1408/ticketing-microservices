import {
  BaseListener,
  OrderCancelledEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";
import { queueGroupName } from "./constants";
import { Message } from "node-nats-streaming";
import {
  ChangeStatusOrderToCancelledService,
  OrderByIdAndPreviousVersionService,
} from "@app/orders/usecases";

class OrderCancelledListener extends BaseListener<OrderCancelledEvent> {
  subject: OrderSubjects.OrderCancelled = OrderSubjects.OrderCancelled;
  queueGroupName: string = queueGroupName;
  durableName: string = "ticket-service-order-cancelled";

  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    // buscar el orden que fue creado que coincida con version y id
    const order = await OrderByIdAndPreviousVersionService.exist(
      data.id,
      data?.version
    );

    // si no hay un order lanzar un error
    if (!order) throw new Error("Order not found!");

    await ChangeStatusOrderToCancelledService.changeStatusToCancelled(order);

    msg.ack();
  }
}

export default OrderCancelledListener;
