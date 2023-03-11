import { app } from "@app/app";
import request from "supertest";
import { CreateTicketService } from "@app/tickets/usecases";
import { OrderCrudRepository } from "@app/orders/domain";

it("should return an error if user is other", async () => {
  const cookieUser = global.signupAndGetCookie();

  CreateTicketService.create({
    price: 20,
    title: "concert10",
  }).then(async (ticket) => {
    const orderResponse = await request(app)
      .post("/api/orders")
      .set("Cookie", cookieUser)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .patch(`/api/orders/${orderResponse.body.order.id}`)
      .set("Cookie", cookieUser)
      .expect(200);

    const orderById = await OrderCrudRepository.getById(
      orderResponse.body.order.id
    );
    expect(orderById?.status).toEqual("Cancelleds");
  });
});
