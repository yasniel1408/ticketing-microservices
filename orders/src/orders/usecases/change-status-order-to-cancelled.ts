import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderRepository } from "@app/orders/domain";

class ChangeStatusOrderToCancelledService {
  async changeStatusToCancelled(order: OrderDocument) {
    return await OrderRepository.updateStateById(order.id, OrderStatus.Cancelled);
  }
}
export default new ChangeStatusOrderToCancelledService();
