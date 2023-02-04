import { app } from "../../../app";
import request from "supertest";

it("should return current user", async () => {
  const cookie = await global.signupAndGetCookie(); // esta es la funcion global que vamos a reutilizar en cada api que se necesite un user logeado

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.user.email).toEqual("test@gmail.com");
});

it("should return null is not authenticated", async () => {
  const res = await request(app).get("/api/users/currentuser").send();

  expect(res.body.user).toBeNull();
});
