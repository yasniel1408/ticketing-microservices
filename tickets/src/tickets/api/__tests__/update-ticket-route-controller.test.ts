import mongoose from "mongoose";
import { app } from "../../../app";
import request from "supertest";
import NatsClientWrapper from "@app/nats-client";

it("return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: 10,
    })
    .expect(404);
});

it("return a 401 if the user does not own the ticket", async () => {
  const ticket = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set("Cookie", global.signupAndGetCookie()) // aqui estamos accediendo con una cookie diferente
    .send({
      title: "Example111",
      price: 20,
    })
    .expect(401);
});

it("return a 400 if the user provides and invalid title or price", async () => {
  const cookies = global.signupAndGetCookie();

  const ticket = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookies)
    .send({
      title: "Example",
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id!}`)
    .set("Cookie", cookies) // aqui estamos accediendo con una cookie diferente
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set("Cookie", cookies) // aqui estamos accediendo con una cookie diferente
    .send({
      title: "Example222",
      price: -10,
    })
    .expect(400);
});

it("update a ticket", async () => {
  const cookies = global.signupAndGetCookie();

  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookies)
    .send({
      title: "Example1",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set("Cookie", cookies)
    .send({
      title: "Example Updated",
      price: 20,
    })
    .expect(200);

  const ticketUpdated = await request(app)
    .get(`/api/tickets/${ticket.body.ticket.id}`)
    .send({})
    .expect(200);

  expect(ticketUpdated.body.ticket.title).toEqual("Example Updated");
  expect(ticketUpdated.body.ticket.price).toEqual(20);
  expect(NatsClientWrapper.client.publish).toHaveBeenCalled();
});
