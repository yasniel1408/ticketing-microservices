import {
  OrderCancelledEvent,
  OrderStatus,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import NatsClientWrapper from "@app/nats-client";
import OrderCancelledListener from "../order-cancelled-listener";
import { CreateOrderService, GetOrderService } from "@app/orders/usecases";

it("sets the userId of the cancelled ticket", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  // create the instance of the listener
  const listener = new OrderCancelledListener(NatsClientWrapper.client);

  //create order
  await CreateOrderService.create({
    id: orderId,
    price: 99,
    status: OrderStatus.Created,
    userId: "sdfswd",
    version: 0,
  });

  // create a fake data event
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 1,
    ticket: {
      id: "sdfsdf",
    },
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a order was updated
  const order = await GetOrderService.get(orderId);
  expect(order).toBeDefined();
  expect(order?.status).toEqual(OrderStatus.Cancelled);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();

  // write assertion that client publish the updated ticket
  // expect(NatsClientWrapper.client.publish).toHaveBeenCalled();
});
