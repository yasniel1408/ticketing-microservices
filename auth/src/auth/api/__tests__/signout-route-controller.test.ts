import { app } from "../../../app";
import request from "supertest";

it("should clear cookies after user signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(res.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
