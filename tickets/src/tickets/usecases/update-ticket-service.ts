import {TicketRepository} from "@app/tickets/domain";
import {TicketDto} from "../domain/models/ticket-dto";

class UpdateTicketService {
  async update(id: string, ticket: TicketDto): Promise<string> {
    

    const ticketId = await TicketRepository.editById(id, ticket);
    return ticketId;
  }
}

export default new UpdateTicketService();
