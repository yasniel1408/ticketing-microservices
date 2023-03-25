import {
  BaseListener,
  ExpirationCompleteEvent,
  PaymentCreatedEvent,
  PaymentSubjects,
} from "@common-ticketing-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupsName } from "@app/orders/events/listener/constants";
import {
  ChangeStatusOrderToCompletedService,
  GetOrderService,
} from "@app/orders/usecases";
import { OrderCompletedPublisher } from "../publishers/order-completed-publisher";

class PaymentCreatedListener extends BaseListener<PaymentCreatedEvent> {
  subject: PaymentSubjects.PaymentCreated = PaymentSubjects.PaymentCreated;
  queueGroupName: string = queueGroupsName;
  durableName: string = "orders-service-payment-created";

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await GetOrderService.get(orderId);

    if (!order) throw new Error("Order not found!");

    const orderUpdated =
      await ChangeStatusOrderToCompletedService.changeStatusToCompleted(order);

    if (!orderUpdated) throw new Error("Order not was completed!");

    await new OrderCompletedPublisher(this.client).publish({
      id: order.id,
      version: orderUpdated?.version!,
    });

    msg.ack(); // este metodo es el que se debe ejecutar para decirle a NATS que se proceso correctamente de lo contrario volvera a reencolar la el evento
  }
}

export default PaymentCreatedListener;
