import natsClient from "@app/nats-client";
import { ExpirationCompletedListener } from "@app/orders/events/listener";
import { CreateOrderService, GetOrderService } from "@app/orders/usecases";
import { CreateTicketService } from "@app/tickets/usecases";
import {
  ExpirationCompleteEvent,
  OrderStatus,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

it("update order status to cancelled", async () => {
  // create a ticket
  const ticketCreated = await CreateTicketService.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "sdgdsgfdsfgdsfg",
    price: 345,
  });

  // create order
  const orderCreated = await CreateOrderService.create(
    ticketCreated.id,
    "qwer"
  );

  // create the instance of the listener
  const listener = new ExpirationCompletedListener(natsClient.client);

  // create a fake data event
  const data: ExpirationCompleteEvent["data"] = {
    orderId: orderCreated.id,
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure a order status was updated
  const order = await GetOrderService.get(data.orderId);
  expect(order).toBeDefined();
  expect(order?.status).toEqual(OrderStatus.Cancelled);
  expect(order?.version).not.toEqual(0);

  // write assertion to make sure ack function is called
  expect(msg.ack).toBeCalled();

  // write assertion to publish the event data
  const eventData = JSON.parse(
    (natsClient.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order?.id);
});
