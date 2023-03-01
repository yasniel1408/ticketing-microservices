import { TicketDto } from "@app/tickets/domain/models/ticket-dto";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { TicketRepository } from "@app/tickets/domain";

class CreateTicketService {
  async create(ticket: TicketDto): Promise<TicketDocument> {
    const userCreated = await TicketRepository.create(ticket);
    return userCreated;
  }
}

export default new CreateTicketService();
