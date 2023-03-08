import { OrderDocument } from "@app/orders/domain/models/order-document";
import { OrderCrudRepository } from "@app/orders/domain";
import { EXPIRATION_WINDOWS_SECONDS } from "../common/constants/constants";
import { OrderStatus } from "@common-ticketing-microservices/common";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { GetTicketService } from "@app/tickets/usecases";

class CreateOrderService {
  async create(ticketId: string, userId: string): Promise<OrderDocument> {
    // Ahora tenemos que calcular el expirationAt de la orden
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOWS_SECONDS);

    const ticket: TicketDocument | null = await GetTicketService.get(ticketId);

    const orderCreated = await OrderCrudRepository.create({
      userId: userId,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket!,
    });
    return orderCreated;
  }
}

export default new CreateOrderService();
