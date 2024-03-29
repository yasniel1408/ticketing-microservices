import {
  BaseListener,
  ExpirationCompleteEvent,
  ExpirationSubjects,
  OrderStatus,
} from "@common-ticketing-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupsName } from "@app/orders/events/listener/constants";
import { OrderCancelledPublisher } from "@app/orders/events/publishers/order-cancelled-publisher";
import {
  ChangeStatusOrderToCancelledService,
  GetOrderService,
} from "@app/orders/usecases";

class ExpirationCompletedListener extends BaseListener<ExpirationCompleteEvent> {
  subject: ExpirationSubjects.ExpirationComplete =
    ExpirationSubjects.ExpirationComplete;
  queueGroupName: string = queueGroupsName;
  durableName: string = "orders-service-expiration-completed";

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await GetOrderService.get(orderId);

    if (!order) throw new Error("Order not found!");

    if (order.status === OrderStatus.Complete) return msg.ack();

    const orderUpdated =
      await ChangeStatusOrderToCancelledService.changeStatusToCancelled(order);

    if (!orderUpdated) throw new Error("Order not was cancelled!");

    //TODO: aqui queda pendiente que la orden cuando se paga no tiene porque cancelarce pero esa logica la veremos luego

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: orderUpdated?.version!,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack(); // este metodo es el que se debe ejecutar para decirle a NATS que se proceso correctamente de lo contrario volvera a reencolar la el evento
  }
}

export default ExpirationCompletedListener;
