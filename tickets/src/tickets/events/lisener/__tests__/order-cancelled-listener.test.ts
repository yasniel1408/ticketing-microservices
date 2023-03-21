import { OrderCancelledEvent } from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { CreateTicketService, GetTicketService } from "@app/tickets/usecases";
import NatsClientWrapper from "@app/nats-client";
import OrderCancelledListener from "../order-cancelled-listener";

it("sets the userId of the cancelled ticket", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  //create ticket
  const ticketCreated = await CreateTicketService.create({
    title: "Example",
    price: 10,
    userId: "asdsdf",
    orderId: orderId,
  });

  // create the instance of the listener
  const listener = new OrderCancelledListener(NatsClientWrapper.client);

  // create a fake data event
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticketCreated.id,
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
  expect(ticket?.orderId).not.toBeDefined();

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();

  // write assertion that client publish the updated ticket
  expect(NatsClientWrapper.client.publish).toHaveBeenCalled();
});
