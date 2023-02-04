import { app } from "../../../app";
import request from "supertest";

it("should fail when a email that does exist is supplied", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(400);
});

it("should return 200 when user signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("should return 400 with incorrect email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "testgmail.com",
      password: "test",
    })
    .expect(400);
});

it("should return 400 with blank password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "",
    })
    .expect(400);
});

it("should return 400 when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "testttt",
    })
    .expect(400);
});
