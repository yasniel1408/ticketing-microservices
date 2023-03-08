import TicketCrudRepository from "./ticket-crud-repository";

class TicketRepository {
  async ifExistTicketById(id: string): Promise<boolean> {
    const ticket = await TicketCrudRepository.getById(id);
    return !!ticket;
  }
}

export default new TicketRepository();
