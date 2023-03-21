import { TicketRepository } from "@app/tickets/domain";

class ExistTicketByIdAndPreviousService {
  async exist(id: string, version: number): Promise<boolean> {
    return !!(await TicketRepository.ifExistByIdAndPreviousVersion(id, version));
  }
}

export default new ExistTicketByIdAndPreviousService();
