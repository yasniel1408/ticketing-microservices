import { app } from "../../../app";
import request from "supertest";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("return an error if an invalid title is provided", async () => {});

it("return an error if an invalid price is provided", async () => {});

it("creates ticket with valid inputs", async () => {});
