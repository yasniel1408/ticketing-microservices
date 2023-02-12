import express, { Request, Response } from "express";
import RouteControllerBase from "@app/common/route-controller-base";
import { VerifyCurrentUser } from "@common-ticketing-microservices/common";

export default class CurrentUserRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "CurrentUserRoute", "/api/users/currentuser");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      [VerifyCurrentUser.verify],
      async (req: Request, res: Response) => {
        return res.status(200).send({ user: req?.currentUser || null });
      }
    );

    return this.app;
  }
}
