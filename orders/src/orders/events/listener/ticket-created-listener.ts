import {
  BaseListener,
  TicketCreatedEvent,
  TicketSubjects,
} from "@common-ticketing-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupsName } from "@app/orders/events/listener/constants";
import { CreateTicketService } from "@app/tickets/usecases";

class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  subject: TicketSubjects.TicketCreated = TicketSubjects.TicketCreated;
  queueGroupName: string = queueGroupsName;
  durableName: string = "orders-service-ticket-created";

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    await CreateTicketService.create({ id, title, price });
    msg.ack(); // este metodo es el que se debe ejecutar para decirle a NATS que se proceso correctamente de lo contrario volvera a reencolar la el evento
  }
}

export default TicketCreatedListener;
