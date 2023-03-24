import OrderCreatedListener from "../order-created-listener";
import {
  OrderCreatedEvent,
  OrderStatus,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import NatsClientWrapper from "@app/nats-client";
import { OrderCrudRepository } from "@app/orders/domain";

it("sets the userId of the ticket", async () => {
  // create the instance of the listener
  const listener = new OrderCreatedListener(NatsClientWrapper.client);

  // create a fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: "safdsfd",
    version: 0,
    expiresAt: new Date().toISOString(),
    ticket: {
      id: "werwe",
      price: 99,
    },
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a order was created
  const order = await OrderCrudRepository.getById(data.id);
  expect(order).toBeDefined();
  expect(order?.price).toEqual(data.ticket.price);
  expect(order?.id).toEqual(data.id);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();
});
