import { TicketDto } from "@app/tickets/domain/models/ticket-dto";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { TicketCrudRepository } from "@app/tickets/domain";

class CreateTicketService {
  async create(ticket: TicketDto): Promise<TicketDocument> {
    const ticketCreated = await TicketCrudRepository.create(ticket);
    return ticketCreated;
  }
}

export default new CreateTicketService();
