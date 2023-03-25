import {
  MongoDBConnection,
  RouteControllerBase,
} from "@common-ticketing-microservices/common";
import { app, routes } from "./app";
import NatsClientWrapper from "./nats-client";
import {
  ExpirationCompletedListener,
  TicketCreatedListener,
  TicketUpdatedListener,
  PaymentCreatedListener,
} from "@app/orders/events/listener";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY undefined!!!");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI undefined!!!");
  if (!process.env.NATS_URL) throw new Error("NATS_URL undefined!!!");
  if (!process.env.NATS_CLIENT_ID)
    throw new Error("NATS_CLIENT_ID undefined!!!");
  if (!process.env.NATS_CLUSTER) throw new Error("NATS_CLUSTER undefined!!!");
  routes.forEach((route: RouteControllerBase) => {
    console.log(
      `Routes configured for ${route.name}, with path: ${route.path}`
    );
  });
  app.listen(3000, async () => {
    console.log("The Server is running!!!");
    await MongoDBConnection.sync();
    await NatsClientWrapper.connect(
      process.env.NATS_CLUSTER!, // este es el nombre del cluster que declaramos que tomaria el nats-deployment.yml en sus argumentos
      process.env.NATS_CLIENT_ID!, // este es el id del servicio, dejamos el nombre para luego el dashboard de eventos poder saber que servicio es
      process.env.NATS_URL!
    );
    NatsClientWrapper.client.on("close", () => {
      // este evento se captura cuando se cierra la conexion
      console.log("NATS connection closed!!!");
      process.exit();
    });

    // capturamos con estos dos eventos del servidor cuando se cierre y cerramos correctamente la conexion con NATS
    process.on("SIGINT", () => NatsClientWrapper.client.close());
    process.on("SIGTERM", () => NatsClientWrapper.client.close());

    new TicketCreatedListener(NatsClientWrapper.client).listen();
    new TicketUpdatedListener(NatsClientWrapper.client).listen();
    new ExpirationCompletedListener(NatsClientWrapper.client).listen();
    new PaymentCreatedListener(NatsClientWrapper.client).listen();
  });
};

start();
