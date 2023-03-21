import natsClient from "@app/nats-client";
import { TicketUpdatedListener } from "@app/orders/events/listener";
import { GetTicketService, CreateTicketService } from "@app/tickets/usecases";
import { TicketUpdatedEvent } from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

it("update ticket", async () => {
  // create a ticket will be updated
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticketCreated = await CreateTicketService.create({
    id: ticketId,
    title: "ExampleABCasdfasdfasd",
    price: 100,
    version: 0,
  });

  // create the instance of the listener
  const listener = new TicketUpdatedListener(natsClient.client);

  // create a fake data event
  const data: TicketUpdatedEvent["data"] = {
    id: ticketId,
    title: ticketCreated.title,
    price: ticketCreated.price.valueOf(),
    version: 1,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a ticket was created
  const ticketUpdated = await GetTicketService.get(ticketId);
  expect(ticketUpdated).toBeDefined();
  expect(ticketUpdated?.title).toEqual(data.title);
  expect(ticketUpdated?.price).toEqual(data.price);
  expect(ticketUpdated?.version).toEqual(1);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  // create a ticket will be updated
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticketCreated = await CreateTicketService.create({
    id: ticketId,
    title: "asdfdsa",
    price: 100,
    version: 0,
  });

  // create the instance of the listener
  const listener = new TicketUpdatedListener(natsClient.client);

  // create a fake data event
  const data: TicketUpdatedEvent["data"] = {
    id: ticketId,
    title: ticketCreated.title,
    price: ticketCreated.price.valueOf(),
    version: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  try {
    await listener.onMessage(data, msg);
  } catch (error) {}

  // write error assertion
  expect(msg.ack).not.toBeCalled();
});
