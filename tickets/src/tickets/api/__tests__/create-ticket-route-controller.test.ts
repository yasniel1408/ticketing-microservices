import { TicketDao } from "@app/tickets/domain/models/ticket-dao";
import { app } from "../../../app";
import request from "supertest";
import NatsClientWrapper from "@app/nats-client";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("return an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      price: 10,
    })
    .expect(400);
});

it("return an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
    })
    .expect(400);
});

it("creates ticket with valid inputs", async () => {
  let tickets = await TicketDao.find();
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: 10,
    })
    .expect(201);

  tickets = await TicketDao.find();
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
});

it("publish an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: 10,
    })
    .expect(201);

  expect(NatsClientWrapper.client.publish).toHaveBeenCalled();
});
