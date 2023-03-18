import { app } from "@app/app";
import request from "supertest";
import { CreateTicketService } from "@app/tickets/usecases";
import { OrderCrudRepository } from "@app/orders/domain";
import {OrderStatus} from "@common-ticketing-microservices/common";
import NatsClientWrapper from "@app/nats-client";

it("should return an error if user is other", async () => {
  const cookieUser = global.signupAndGetCookie();

  /**
   * Create ticket
   */
  const ticket = await CreateTicketService.create({
    price: 10,
    title: "Title A",
  });

  /**
   * Create Order with the ticket
   */
  const orderResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", cookieUser)
    .send({ ticketId: ticket.id });

  /**
   * Update the order to Cancelled
   */
  await request(app)
    .patch(`/api/orders/${orderResponse.body.order.id}`)
    .set("Cookie", cookieUser)
    .expect(200);

  /**
   * Get order and expect that status is Cancelled
   */
  const orderById = await OrderCrudRepository.getById(
    orderResponse.body.order.id
  );

  expect(orderById?.status).toEqual(OrderStatus.Cancelled);
  expect(NatsClientWrapper.client.publish).toHaveBeenCalled()
});

it.todo("emits a order cancelled event")