import { app } from "@app/app";
import request from "supertest";
import mongoose from "mongoose";
import { CreateTicketService } from "@app/tickets/usecases";
import { CreateOrderService } from "@app/orders/usecases";

it("return an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId(); // esto para generar un id real de mongo
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signupAndGetCookie())
    .send({ ticketId })
    .expect(404);
});

it("return an error if ticket is already reserved", async () => {
  const ticket = await CreateTicketService.create({
    price: 10,
    title: "Title A",
  });
  CreateOrderService.create(ticket?.id, "qwerqwerqwerqer").then(async () => {
    await request(app)
      .post("/api/orders")
      .set("Cookie", global.signupAndGetCookie())
      .send({ ticketId: ticket?.id })
      .expect(400);
  });
});

it("reserved a ticket", async () => {
  CreateTicketService.create({
    price: 20,
    title: "Title B",
  }).then(async (ticket) => {
    await request(app)
      .post("/api/orders")
      .set("Cookie", global.signupAndGetCookie())
      .send({ ticketId: ticket?.id })
      .expect(201);
  });
});
