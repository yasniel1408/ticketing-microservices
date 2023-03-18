import { TicketDao } from "./models/ticket-dao";
import TicketCrudRepository from "./ticket-crud-repository";

class TicketRepository {
  async ifExistTicketById(id: string): Promise<boolean> {
    const ticket = await TicketCrudRepository.getById(id);
    return !!ticket;
  }

  async ifExistByIdAndCurrentVersion(
    id: string,
    version: number
  ): Promise<boolean> {
    const ticket = await TicketDao.findOne({
      _id: id,
      version: version,
    }).exec();
    return !!ticket;
  }
}

export default new TicketRepository();
