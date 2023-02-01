import { app } from "../../../app";
import request from "supertest";

it("should return 201 when user signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(201);
});

it("should return 400 whit an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "test",
    })
    .expect(400);
});

it("should return 400 whit an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "p",
    })
    .expect(400);
});

it("should return 400 whit missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});


it("should return 400 when email exist", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(400);
});

it("should return 400 when email or password is black", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "test",
    })
    .expect(400);
});