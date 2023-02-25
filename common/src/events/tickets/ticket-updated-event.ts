import BaseEvent from "../base-event";
import TicketSubjects from "./ticket-subjects";

export default interface TicketUpdatedEvent extends BaseEvent {
  subject: TicketSubjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
