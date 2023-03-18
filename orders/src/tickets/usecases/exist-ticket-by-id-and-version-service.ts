import { TicketRepository } from "@app/tickets/domain";

class ExistTicketByIdAndVersionService {
  async exist(id: string, version: number): Promise<boolean> {
    return !!(await TicketRepository.ifExistByIdAndCurrentVersion(id, version));
  }
}

export default new ExistTicketByIdAndVersionService();
