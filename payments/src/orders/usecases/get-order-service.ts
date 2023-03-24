import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderCrudRepository } from "@app/orders/domain";

class GetOrderService {
  async get(id: string): Promise<OrderDocument | null> {
    const order = await OrderCrudRepository.getById(id);
    return order;
  }
}

export default new GetOrderService();
