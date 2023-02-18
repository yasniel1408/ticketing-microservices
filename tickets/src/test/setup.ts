import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { CreateJwt } from "@common-ticketing-microservices/common";

declare global {
  var signupAndGetCookie: () => string[];
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
//en este casi debemos devolver un ejemplo de jwt para simular un user autenticado
global.signupAndGetCookie = () => {
  // 1- Crear JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // 2- Create JWT
  const token = CreateJwt.create(payload);

  // 3- Crear session Object
  const session = { jwt: token };

  // 4- Convertir la session en JSON
  const sessionJSON = JSON.stringify(session);

  // 5- Tomar JSON and encode a base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // 6- Retornar la cookie simulada
  const cookie = `session=${base64}`;

  return [cookie];
};
