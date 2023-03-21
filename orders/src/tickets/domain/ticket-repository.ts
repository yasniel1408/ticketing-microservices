import { TicketDao } from "./models/ticket-dao";
import TicketCrudRepository from "./ticket-crud-repository";

class TicketRepository {
  async ifExistTicketById(id: string): Promise<boolean> {
    const ticket = await TicketCrudRepository.getById(id);
    return !!ticket;
  }

  async ifExistByIdAndPreviousVersion(
    id: string,
    version: number
  ): Promise<boolean> {
    const ticket = await TicketDao.findOne({
      _id: id,
      version: version - 1, // esto es para buscar por el id y la version anterior
    }).exec();
    return !!ticket;
  }
}

export default new TicketRepository();
