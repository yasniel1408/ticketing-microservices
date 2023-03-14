import { app } from "@app/app";
import request from "supertest";
import { CreateTicketService } from "@app/tickets/usecases";
import sleep from "@app/__mocks__/sleep";

it("fetches orders for an particular user", async () => {
  // crear 3 tickets
  const ticket1 = await CreateTicketService.create({
    price: 10,
    title: "dsgfdsgdsfg",
  });
  const ticket2 = await CreateTicketService.create({
    price: 20,
    title: "Title 2",
  });
  const ticket3 = await CreateTicketService.create({
    price: 30,
    title: "Title 3",
  });

  // tener 2 usuarios diferentes
  const cookieUser1 = global.signupAndGetCookie();
  const cookieUser2 = global.signupAndGetCookie();

  sleep(1000);

  // crear una order del ticke1 para el cookieUser1, y el ticket2 y ticket3 para el cookieUser2
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookieUser1)
    .send({ ticketId: ticket1?.id });
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookieUser2)
    .send({ ticketId: ticket2?.id });
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookieUser2)
    .send({ ticketId: ticket3?.id });

  // obtener los tickets del cookieUser2
  const ticketsUser2 = await request(app)
    .get("/api/orders")
    .set("Cookie", cookieUser2)
    .expect(200);

  expect(ticketsUser2.body.tickets.length).toEqual(2);
  expect(ticketsUser2.body.tickets[0].ticket.title).toEqual("Title 2");
  expect(ticketsUser2.body.tickets[1].ticket.title).toEqual("Title 3");
});
