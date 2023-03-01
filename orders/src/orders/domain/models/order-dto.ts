import { TicketDocument } from "@app/tickets/domain/models/ticket-document";

export interface OrderDto {
  status: string;
  expiresAt: Date;
  userId: string;
  ticket: TicketDocument; // esta propiedad hacer referencia a la relacion que existe entre ticket y order
}
