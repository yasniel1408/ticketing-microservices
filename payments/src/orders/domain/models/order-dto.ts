import { OrderStatus } from "@common-ticketing-microservices/common";

export interface OrderDto {
  id?: string;
  status: OrderStatus;
  userId: string;
  price: number;
  version?: number;
}
