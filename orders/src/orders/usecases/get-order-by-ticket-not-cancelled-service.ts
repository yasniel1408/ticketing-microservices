import { OrderRepository } from "@app/orders/domain";
import { OrderStatus } from "@common-ticketing-microservices/common";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import { GetTicketService } from "@app/tickets/usecases";

class GetOrderByTicketNotCancelledService {
  async get(ticketId: string): Promise<OrderDocument | null> {
    const statusArray = [
      OrderStatus.Created,
      OrderStatus.AwaitingPayment,
      OrderStatus.Complete,
    ];

    const ticket: TicketDocument | null = await GetTicketService.get(ticketId);

    const order = await OrderRepository.getByTicketWithSomeStatus(
      ticket!,
      statusArray
    );
    return order;
  }
}

export default new GetOrderByTicketNotCancelledService();
