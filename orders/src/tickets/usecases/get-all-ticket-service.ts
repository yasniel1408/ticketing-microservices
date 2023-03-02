import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { TicketCrudRepository } from "@app/tickets/domain";

class GetAllTicketService {
  async getAll(): Promise<TicketDocument[]> {
    const tickets = await TicketCrudRepository.findAll();
    return tickets;
  }
}

export default new GetAllTicketService();
