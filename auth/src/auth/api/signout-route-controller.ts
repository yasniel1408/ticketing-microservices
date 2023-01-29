import express, { Request, Response } from "express";
import RouteControllerBase from "../../common/route-controller-base";

export class SignoutRouteController extends RouteControllerBase {
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
