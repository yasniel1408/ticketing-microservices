import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderRepository } from "@app/orders/domain";

class ChangeStatusOrderToCompletedService {
  async changeStatusToCompleted(order: OrderDocument) {
    return await OrderRepository.updateStateById(
      order.id,
      OrderStatus.Complete
    );
  }
}
export default new ChangeStatusOrderToCompletedService();
