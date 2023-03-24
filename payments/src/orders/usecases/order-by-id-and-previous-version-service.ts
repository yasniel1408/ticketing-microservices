import { OrderRepository } from "@app/orders/domain";
import { OrderDocument } from "@app/orders/domain/models/order-document";

class OrderByIdAndPreviousVersionService {
  async exist(id: string, version: number): Promise<OrderDocument | null> {
    return await OrderRepository.getByIdAndPreviousVersion(id, version);
  }
}

export default new OrderByIdAndPreviousVersionService();
