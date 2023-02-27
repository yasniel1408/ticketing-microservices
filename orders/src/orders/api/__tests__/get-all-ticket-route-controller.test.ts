import { app } from "../../../app";
import request from "supertest";

it("return all tickets", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example1",
      price: 10,
    })
    .expect(201);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example2",
      price: 10,
    })
    .expect(201);

  const tickets = await request(app).get(`/api/tickets`).send({}).expect(200);

  expect(tickets.body.tickets[0].title).toEqual("Example1");
  expect(tickets.body.tickets[1].title).toEqual("Example2");
  expect(tickets.body.tickets.length).toEqual(2);
});
