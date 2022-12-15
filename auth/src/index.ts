import express from "express";
import "express-async-errors"; // esto resuelve el problea de lanzar errores en funciones con async
import { json } from "body-parser";

import { NotFoundError } from "./common/errors/not-found-error";
import MongoDBConnection from "./common/db/mongo-db-connection";
import RouteControllerBase from "./common/route-controller-base";
import ErrorHandlerMiddleware from "./common/middlewares/error-handler-middleware";
import VerifyErrorMiddleware from "./common/middlewares/verify-errror-middleware";
import { SignupRouteController } from "./auth/api/controllers/signup-route-controller";
import cookieSession from "cookie-session"

const app = express();
app.set("trust proxy", true); // esto es para que podamos ingresar y confiar en el proxy
app.use(json());
app.use(cookieSession({
  signed: false, // esto es para desactivar el encriptado de las cookies
  secure: true, // esto es para agregar seguridad de que solo se puede ingresar por https
}))

export class MainApp {
  routes: Array<RouteControllerBase> = [];

  constructor() {
    // Routes
    this.routes.push(new SignupRouteController(app));
    app.all("*", async () => {
      throw new NotFoundError();
    });

    // Middlewares
    app.use(ErrorHandlerMiddleware.handler);
    app.use(VerifyErrorMiddleware.verify);
  }

  start = async () => {
    if(!process.env.JWT_KEY) throw new Error("JWT_KEY undefined!!!")
    this.routes.forEach((route: RouteControllerBase) => {
      console.log(`Routes configured for ${route.name}, with path: ${route.path}`);
    });
    app.listen(3000, () => {
      console.log("AUTH SERVICE => Listening on port 3000");
    });
    await MongoDBConnection.sync();
  };
}

const mainApp = new MainApp();
mainApp.start();
