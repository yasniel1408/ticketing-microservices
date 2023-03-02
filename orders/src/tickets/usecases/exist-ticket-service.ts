import { TicketRepository } from "@app/tickets/domain";

class ExistTicketService {
  async exist(id: string): Promise<boolean> {
    return await TicketRepository.ifExistTicketById(id);
  }
}

export default new ExistTicketService();
