import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderCrudRepository } from "@app/orders/domain";

class ChangeStatusOrderToCancelledService {
  async changeStatusToCancelled(order: OrderDocument) {
    order.status = OrderStatus.Cancelled;

    await OrderCrudRepository.editById(order.id, order);
  }
}
export default new ChangeStatusOrderToCancelledService();
