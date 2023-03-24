import {
  BaseListener,
  TicketUpdatedEvent,
  TicketSubjects,
} from "@common-ticketing-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupsName } from "@app/orders/events/listener/constants";
import {
  ExistTicketByIdAndPreviousVersionService,
  UpdateTicketService,
} from "@app/tickets/usecases";

class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent> {
  subject: TicketSubjects.TicketUpdated = TicketSubjects.TicketUpdated;
  queueGroupName: string = queueGroupsName;
  durableName: string = "orders-service-ticket-updated";

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;

    console.log(version);

    // hay que verificar la version para que no cometamos errores de concurrencia, deberia estar la version anterior por eso el -1 en el repository
    const thereIsATicket = await ExistTicketByIdAndPreviousVersionService.exist(
      id,
      version
    );
    if (!thereIsATicket) throw Error("Last ticket not found!");

    await UpdateTicketService.update(id, { title, price, version });
    msg.ack(); // este metodo es el que se debe ejecutar para decirle a NATS que se proceso correctamente de lo contrario volvera a reencolar la el evento
  }
}

export default TicketUpdatedListener;
