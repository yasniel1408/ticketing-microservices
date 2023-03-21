import {BasePublisher, TicketCreatedEvent, TicketSubjects,} from "@common-ticketing-microservices/common";

export default class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = TicketSubjects.TicketCreated;
}
