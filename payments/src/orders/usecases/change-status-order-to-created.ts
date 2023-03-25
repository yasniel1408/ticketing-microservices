import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderCrudRepository } from "@app/orders/domain";

class ChangeStatusOrderToCreatedService {
  async changeStatusToCreated(order: Partial<OrderDocument>) {
    order.status = OrderStatus.Complete;

    await OrderCrudRepository.editById(order.id, order);
  }
}
export default new ChangeStatusOrderToCreatedService();
