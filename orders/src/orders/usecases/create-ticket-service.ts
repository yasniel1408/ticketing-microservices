import { TicketDto } from "@app/orders/domain/models/ticket-dto";
import { TicketDocument } from "@app/orders/domain/models/ticket-document";
import { TicketRepository } from "@app/orders/domain";

class CreateTicketService {
  async create(ticket: TicketDto): Promise<TicketDocument> {
    const userCreated = await TicketRepository.create(ticket);
    return userCreated;
  }
}

export default new CreateTicketService();
