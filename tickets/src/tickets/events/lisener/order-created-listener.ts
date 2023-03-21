import {
  BaseListener,
  OrderCreatedEvent,
  OrderSubjects,
} from "@common-ticketing-microservices/common";
import { queueGroupName } from "./constants";
import { Message } from "node-nats-streaming";
import { GetTicketService, UpdateTicketService } from "@app/tickets/usecases";
import { TicketUpdatedPublisher } from "@app/tickets/events/publishers";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: OrderSubjects.OrderCreated = OrderSubjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  durableName: string = "ticket-service-order-created";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    // buscar el ticket que fue reservado por la orden
    const ticket = await GetTicketService.get(data.ticket.id);

    // si no hay un ticket lanzar un error
    if (!ticket) throw new Error("Ticket not found!");

    // hacer que el ticker este reservado agregando el id de la orden
    const ticketUpdated = await UpdateTicketService.update(data.ticket.id, {
      orderId: data.id, // este orderId significa que esta reservado por lo tanto no puede estar editable mientras el user esta haciendo la compra
    });

    // emitir un evento de actualizacion del ticket para que todos los demas servicios se enteren de que tambien esta siendo usado por una orden de algun usuarios
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticketUpdated.id,
      title: ticketUpdated.title,
      price: ticketUpdated.price.valueOf(),
      userId: ticketUpdated.userId,
      version: ticketUpdated.version!,
      orderId: data.id,
    });

    msg.ack();
  }
}

export default OrderCreatedListener;
