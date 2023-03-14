import { app } from "@app/app";
import request from "supertest";
import { CreateTicketService } from "@app/tickets/usecases";
import { OrderCrudRepository } from "@app/orders/domain";

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
    .send({ ticketId: ticket.id })
    .expect(201);

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
  expect(orderById?.status).toEqual("cancelled");
});
