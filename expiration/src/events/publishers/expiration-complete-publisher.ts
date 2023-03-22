import {
  BasePublisher,
  ExpirationCompleteEvent,
  ExpirationSubjects,
} from "@common-ticketing-microservices/common";

class ExpirationCompletePublisher extends BasePublisher<ExpirationCompleteEvent> {
  subject: ExpirationSubjects.ExpirationComplete =
    ExpirationSubjects.ExpirationComplete;
}

export default ExpirationCompletePublisher;