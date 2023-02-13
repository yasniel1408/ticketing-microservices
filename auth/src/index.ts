import { RouteControllerBase } from "@common-ticketing-microservices/common";
import { app, routes } from "./app";
import mongoDbConnection from "@app/common/db/mongo-db-connection";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY undefined!!!");
  routes.forEach((route: RouteControllerBase) => {
    console.log(
      `Routes configured for ${route.name}, with path: ${route.path}`
    );
  });
  app.listen(3000, () => {
    console.log("AUTH SERVICE => Listening on port 3000");
  });
  await mongoDbConnection.sync();
};

start();
