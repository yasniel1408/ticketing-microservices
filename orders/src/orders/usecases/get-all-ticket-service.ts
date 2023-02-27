import { TicketDocument } from "@app/orders/domain/models/ticket-document";
import { TicketRepository } from "@app/orders/domain";

class GetAllTicketService {
  async getAll(): Promise<TicketDocument[]> {
    const tickets = await TicketRepository.findAll();
    return tickets;
  }
}

export default new GetAllTicketService();
