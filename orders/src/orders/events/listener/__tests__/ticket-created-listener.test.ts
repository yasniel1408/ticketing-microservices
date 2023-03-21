import natsClient from "@app/nats-client";
import { TicketCreatedListener } from "@app/orders/events/listener";
import { GetTicketService } from "@app/tickets/usecases";
import { TicketCreatedEvent } from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

it("create a save ticket", async () => {
  // create the instance of the listener
  const listener = new TicketCreatedListener(natsClient.client);

  // create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Example",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a ticket was created
  const ticket = await GetTicketService.get(data.id);
  expect(ticket).toBeDefined();
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();
});
