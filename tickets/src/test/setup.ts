import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  var signupAndGetCookie: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  //Envs in tests
  process.env.JWT_KEY = "test";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach((collection) => {
    collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//esto es para evitar tener que hacer registro de users cada ves que se requiera pudiera estar en una funcion aparte pero esta es una manera elegante de resolver sin tener importanciones luego en todos los archivos de prueba
global.signupAndGetCookie = async () => {
  const email: string = "test@gmail.com";
  const password: string = "test";

  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  return cookie;
};
