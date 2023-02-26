import {
  MongoDBConnection,
  RouteControllerBase,
} from "@common-ticketing-microservices/common";
import { app, routes } from "./app";
import NatsClientWrapper from "./nats-client";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY undefined!!!");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI undefined!!!");
  routes.forEach((route: RouteControllerBase) => {
    console.log(
      `Routes configured for ${route.name}, with path: ${route.path}`
    );
  });
  app.listen(3000, async () => {
    console.log("The Server is running!!!");
    await MongoDBConnection.sync();
    await NatsClientWrapper.connect(
      "ticketing",
      "puedesercualquieridserviciotickets",
      "http://nats-service:4222"
    );
    NatsClientWrapper.client.on("close", () => {
      // este evento se captura cuando se cierra la conexion
      console.log("NATS connection closed!!!");
      process.exit();
    });

    // capturamos con estos dos eventos del servidor cuando se cierre y cerramos correctamente la conexion con NATS
    process.on("SIGINT", () => NatsClientWrapper.client.close());
    process.on("SIGTERM", () => NatsClientWrapper.client.close());
  });
};

start();
