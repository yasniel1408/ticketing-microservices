import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDao } from "./models/order-dao";
import { OrderDocument } from "./models/order-document";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";

class OrderRepository {
  async getByTicketWithSomeStatus(
    ticket: TicketDocument,
    status: OrderStatus[]
  ): Promise<OrderDocument | null> {
    const order = await OrderDao.findOne({
      ticket,
      status: {
        $in: [...status], // de esta manera le decimos que queremos dado que el status sea algunos de los que le mandemos por parametros
      },
    }).exec();
    return order;
  }
}

export default new OrderRepository();
