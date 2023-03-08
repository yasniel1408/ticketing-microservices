import { OrderRepository } from "@app/orders/domain";
import { OrderDocument } from "@app/orders/domain/models/order-document";

class GetAllOrdersByUserIdService {
  async getAll(userId: string): Promise<OrderDocument[]> {
    const tickets = await OrderRepository.findAllByUserId(userId);
    return tickets;
  }
}

export default new GetAllOrdersByUserIdService();
