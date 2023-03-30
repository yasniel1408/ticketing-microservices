import { app } from "../../../app";
import request from "supertest";
import { GetTicketService } from "@app/tickets/usecases";
import { Types } from "mongoose";

it("return a 404 if the ticket is not found", async () => {
  const id = new Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/tickets/${id}`).send({});

  expect(response.status).toEqual(404);
});

it("return the ticket if the ticket is found", async () => {
  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signupAndGetCookie())
    .send({
      title: "Example",
      price: 10,
    })
    .expect(201);

  const ticketSaved = await request(app)
    .get(`/api/tickets/${ticket.body.ticket.id}`)
    .send({})
    .expect(200);

  expect(ticket.body.ticket.title).toEqual(ticketSaved.body.ticket.title);
});

describe("GetTicketRouteController", () => {
  describe("configureRoutes()", () => {
    it("should return ticket when id exists", async () => {
      // Arrange
      const expectedId = "123";
      const expectedResponse = { ticket: { id: expectedId } };

      //@ts-ignore
      jest.spyOn(GetTicketService, "get").mockResolvedValueOnce({
        id: expectedId,
      });

      await request(app)
        .get(`/api/tickets/${expectedId}`)
        .expect(200)
        .then((res) => {
          // Assert
          expect(res.body).toEqual(expectedResponse);
        });
    });

    it("should return 404 when id does not exist", async () => {
      // Arrange
      const expectedId = "123";

      jest.spyOn(GetTicketService, "get").mockResolvedValueOnce(null);

      await request(app).get(`/api/tickets/${expectedId}`).expect(404);
    });
  });
});
