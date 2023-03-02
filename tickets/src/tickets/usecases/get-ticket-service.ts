import {TicketDocument} from "@app/tickets/domain/models/ticket-document";
import {TicketCrudRepository} from "@app/tickets/domain";

class GetTicketService {
  async get(id: string): Promise<TicketDocument | null> {
    const ticket = await TicketCrudRepository.getById(id);
    return ticket;
  }
}

export default new GetTicketService();
