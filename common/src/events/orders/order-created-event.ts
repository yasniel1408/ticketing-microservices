import OrderSubjects from "./order-subjects";
import BaseEvent from "../base-event";
import { OrderStatus } from "../../index";

export default interface OrderCreatedEvent extends BaseEvent {
  subject: OrderSubjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    version: number;
    expiresAt: string; // en estes caso vamos a querer que sea un string para poder mostrarlo mas facil y tambien porque lo vamos a madar una ves ya procesado
    ticket: {
      id: string;
      price: number;
    };
  };
}
