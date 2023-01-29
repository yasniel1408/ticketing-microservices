import express, { Request, Response } from "express";
import RouteControllerBase from "common/route-controller-base";
import VerifyJwt from "common/helpers/verify-jwt";

export default class CurrentUserRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "CurrentUserRoute", "/api/users/currentuser");
  }

  configureRoutes(): express.Application {
    this.app.get(this.path, [], async (req: Request, res: Response) => {
      if (!req.session?.jwt) {
        return res.status(200).send({ user: null });
      }

      try {
        const payload = VerifyJwt.verify(req.session.jwt);

        res.status(200).json({ user: payload });
      } catch (error) {
        return res.status(200).send({ user: null });
      }
    });

    return this.app;
  }
}
