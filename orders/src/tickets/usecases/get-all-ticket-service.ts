import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { TicketRepository } from "@app/tickets/domain";

class GetAllTicketService {
  async getAll(): Promise<TicketDocument[]> {
    const tickets = await TicketRepository.findAll();
    return tickets;
  }
}

export default new GetAllTicketService();
