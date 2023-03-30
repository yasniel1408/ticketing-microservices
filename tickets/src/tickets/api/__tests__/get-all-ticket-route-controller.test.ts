import { app } from "../../../app";
import request from "supertest";
import { VerifyErrorMiddleware } from "@common-ticketing-microservices/common";

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

describe("VerifyErrorMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const next = jest.fn();

  beforeEach(() => {
    req = {};
    res = {
      //@ts-ignore
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next.mockClear();
  });

  describe("verify", () => {
    it("should call next if verification passes", async () => {
      // Arrange
      const verifySpy = jest.spyOn(VerifyErrorMiddleware, "verify");
      const middleware = VerifyErrorMiddleware;

      // Act
      //@ts-ignore
      await middleware.verify(req as Request, res as Response, next);

      // Assert
      expect(verifySpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
