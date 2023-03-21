import OrderCreatedListener from "../order-created-listener";
import {
  OrderCreatedEvent,
  OrderStatus,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { CreateTicketService, GetTicketService } from "@app/tickets/usecases";
import NatsClientWrapper from "@app/nats-client";

it("sets the userId of the ticket", async () => {
  //create ticket
  const ticketCreated = await CreateTicketService.create({
    title: "Examplesdfsdfsdfs",
    price: 10,
    userId: "asdsdf",
  });

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
      id: ticketCreated.id,
      price: ticketCreated.price.valueOf(),
    },
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a ticket was updated
  const ticket = await GetTicketService.get(ticketCreated.id);
  expect(ticket).toBeDefined();
  expect(ticket?.orderId).toEqual(data.id);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();

  // write assertion that client publish the updated ticket
  expect(NatsClientWrapper.client.publish).toHaveBeenCalled();
});
