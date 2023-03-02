import { TicketCrudRepository } from "@app/tickets/domain";
import { TicketDto } from "../domain/models/ticket-dto";

class UpdateTicketService {
  async update(id: string, ticket: TicketDto): Promise<string> {
    const ticketId = await TicketCrudRepository.editById(id, ticket);
    return ticketId;
  }
}

export default new UpdateTicketService();
