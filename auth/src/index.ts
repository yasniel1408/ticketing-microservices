import express from "express";
import "express-async-errors"; // esto resuleve el problea de lanzar errores en funciones con async
import { json } from "body-parser";

import { NotFoundError } from "./common/errors/not-found-error";
import MongoDBConnection from "./common/db/mongo-db-connection";
import RouteControllerBase from "./common/route-controller-base";
import ErrorHandlerMiddleware from "./common/middlewares/error-handler-middleware";
import VerifyErrorMiddleware from "./common/middlewares/verify-errror-middleware";
import { SignupRouteController } from "./auth/controllers/signup-route-controller";

const app = express();
app.use(json());

export class MainApp {
  routes: Array<RouteControllerBase> = [];

  constructor() {
    this.routes.push(new SignupRouteController(app));

    app.get("/api/users", (req, res) => {
      res.json({ hello: "Auth Service" });
    });
  }

  start = async () => {
    MongoDBConnection.sync();
    app.listen(3000, () => {
      this.routes.forEach((route: RouteControllerBase) => {
        console.log(`Routes configured for ${route.getName()}`);
      });
      app.all("*", async () => {
        throw new NotFoundError();
      });

      // Middlewares
      app.use(ErrorHandlerMiddleware.handler);
      app.use(VerifyErrorMiddleware.verify);

      console.log("AUTH SERVICE => Listening on port 3000");
    });
  };
}

const mainApp = new MainApp();
mainApp.start();
