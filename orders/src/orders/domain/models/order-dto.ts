import { TicketDocument } from "@app/tickets/domain/models/ticket-document";
import { OrderStatus } from "@common-ticketing-microservices/common";

export interface OrderDto {
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  version?: number;
  ticket: TicketDocument; // esta propiedad hacer referencia a la relacion que existe entre ticket y order
}
