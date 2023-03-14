import { OrderRepository } from "@app/orders/domain";
import { OrderStatus } from "@common-ticketing-microservices/common";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { ObjectId } from "mongoose";

class GetOrderByTicketNotCancelledService {
  async get(ticketId: ObjectId): Promise<OrderDocument | null> {
    const statusArray = [
      OrderStatus.Created,
      OrderStatus.AwaitingPayment,
      OrderStatus.Complete,
    ];

    const order = await OrderRepository.getByTicketWithSomeStatus(
      ticketId,
      statusArray
    );
    return order;
  }
}

export default new GetOrderByTicketNotCancelledService();
