import express from "express";
import "express-async-errors"; // esto resuelve el problea de lanzar errores en funciones con async
import { json } from "body-parser";

import { NotFoundError } from "./common/errors/not-found-error";
import MongoDBConnection from "./common/db/mongo-db-connection";
import RouteControllerBase from "./common/route-controller-base";
import ErrorHandlerMiddleware from "./common/middlewares/error-handler-middleware";
import { SignupRouteController } from "./auth/controllers/signup-route-controller";

const app = express();
app.use(json());

export class MainApp {
  routes: Array<RouteControllerBase> = [];

  constructor() {
    // Routes
    this.routes.push(new SignupRouteController(app));
    app.all("*", async () => {
      throw new NotFoundError();
    });
  }

  start = async () => {
    // Middlewares
    app.use(ErrorHandlerMiddleware.handler);
    this.routes.forEach((route: RouteControllerBase) => {
      console.log(`Routes configured for ${route.getName()}`);
    });
    app.listen(3000, () => {
      console.log("AUTH SERVICE => Listening on port 3000");
    });
    await MongoDBConnection.sync();
  };
}

const mainApp = new MainApp();
mainApp.start();
