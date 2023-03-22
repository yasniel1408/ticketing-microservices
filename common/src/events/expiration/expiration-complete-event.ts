import BaseEvent from "../base-event";
import ExpirationSubjects from "./expiration-subjects";

export default interface ExpirationCompleteEvent extends BaseEvent {
  subject: ExpirationSubjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
