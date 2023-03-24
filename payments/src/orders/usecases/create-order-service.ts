import { OrderDto } from "../domain/models/order-dto";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderCrudRepository } from "@app/orders/domain";

class CreateOrderService {
  async create(order: OrderDto): Promise<OrderDocument> {
    const orderCreated = await OrderCrudRepository.create(order);
    return orderCreated;
  }
}

export default new CreateOrderService();
