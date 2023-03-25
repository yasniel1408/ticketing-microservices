import OrderSubjects from "./order-subjects";
import BaseEvent from "../base-event";

export default interface OrderCompletedEvent extends BaseEvent {
  subject: OrderSubjects.OrderCompleted;
  data: {
    id: string;
    version: number;
  };
}
