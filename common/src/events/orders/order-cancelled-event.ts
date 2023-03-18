import OrderSubjects from "./order-subjects";
import BaseEvent from "../base-event";

export default interface OrderCancelledEvent extends BaseEvent {
    subject: OrderSubjects.OrderCancelled;
    data: {
        id: string;
        ticket: {
            id: string;
        }
    };
}
