import { app } from "@app/app";
import request from "supertest";
import NatsClientWrapper from "@app/nats-client";
import { CreateTicketService } from "@app/tickets/usecases";

it("should return one order", async () => {
  const user = global.signupAndGetCookie();

  CreateTicketService.create({
    price: 10,
    title: "concert",
  }).then(async (ticket) => {
    const orderResponse = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    const fetchedOrderResponse = await request(app)
      .get(`/api/orders/${orderResponse.body.order.id}`)
      .set("Cookie", user)
      .expect(200);

    expect(fetchedOrderResponse.body.ticket.id).toEqual(
      orderResponse.body.ticket.id
    );
  });
});

it("should return an error if user is other", async () => {
  CreateTicketService.create({
    price: 20,
    title: "concert1",
  }).then(async (ticket) => {
    const orderResponse = await request(app)
      .post("/api/orders")
      .set("Cookie", global.signupAndGetCookie())
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .get(`/api/orders/${orderResponse.body.order.id}`)
      .set("Cookie", global.signupAndGetCookie())
      .expect(401);
  });
});
