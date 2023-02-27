import { TicketDocument } from "@app/orders/domain/models/ticket-document";
import { TicketRepository } from "@app/orders/domain";

class GetTicketService {
  async get(id: string): Promise<TicketDocument | null> {
    const ticket = await TicketRepository.getById(id);
    return ticket;
  }
}

export default new GetTicketService();
