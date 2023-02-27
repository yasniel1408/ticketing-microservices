import {BasePublisher, TicketSubjects, TicketUpdatedEvent,} from "@common-ticketing-microservices/common";

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subject = TicketSubjects.TicketUpdated;
}
