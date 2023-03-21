import { TicketCrudRepository } from "@app/tickets/domain";
import { TicketDto } from "../domain/models/ticket-dto";
import { TicketDocument } from "../domain/models/ticket-document";

class UpdateTicketService {
  async update(
    id: string,
    ticket: Partial<TicketDto>
  ): Promise<TicketDocument> {
    const ticketUpdated: TicketDocument = await TicketCrudRepository.editById(
      id,
      ticket
    );
    return ticketUpdated;
  }
}

export default new UpdateTicketService();
