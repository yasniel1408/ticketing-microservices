import {
  CurrentUserRouteController,
  SignInRouteController,
  SignOutRouteController,
  SignUpRouteController,
} from "auth/api";
import mongoDbConnection from "common/db/mongo-db-connection";
import { NotFoundError } from "common/errors";
import { ErrorHandlerMiddleware } from "common/middlewares";
import RouteControllerBase from "common/route-controller-base";
import { server } from "server";

export class App {
  routes: Array<RouteControllerBase> = [];

  constructor() {
    // Routes
    this.routes.push(new SignUpRouteController(server));
    this.routes.push(new SignInRouteController(server));
    this.routes.push(new CurrentUserRouteController(server));
    this.routes.push(new SignOutRouteController(server));
    server.all("*", async () => {
      throw new NotFoundError();
    });

    // Middlewares
    server.use(ErrorHandlerMiddleware.handler);
  }

  start = async () => {
    if (!process.env.JWT_KEY) throw new Error("JWT_KEY undefined!!!");
    this.routes.forEach((route: RouteControllerBase) => {
      console.log(
        `Routes configured for ${route.name}, with path: ${route.path}`
      );
    });
    server.listen(3000, () => {
      console.log("AUTH SERVICE => Listening on port 3000");
    });
    await mongoDbConnection.sync();
  };
}

const mainApp = new App();
mainApp.start();
