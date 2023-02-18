import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { TicketRepository } from "@app/tickets/domain";

class GetTicketService {
  async get(id: string): Promise<TicketDocument | null> {
    const ticket = await TicketRepository.getById(id);
    return ticket;
  }
}

export default new GetTicketService();
