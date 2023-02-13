import { RouteControllerBase } from "@common-ticketing-microservices/common";
import express, { Request, Response } from "express";

export default class SignOutRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignoutRoute", "/api/users/signout");
  }

  configureRoutes(): express.Application {
    this.app.post(this.path, [], async (req: Request, res: Response) => {
      req.session = null;

      return res.status(200).send({ user: null });
    });

    return this.app;
  }
}
