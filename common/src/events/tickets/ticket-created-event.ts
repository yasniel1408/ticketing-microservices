import TicketSubjects from "./ticket-subjects";
import BaseEvent from "../base-event";

export default interface TicketCreatedEvent extends BaseEvent {
  subject: TicketSubjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
}
