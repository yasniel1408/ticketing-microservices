import express, { Request, Response } from "express";
import {
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";

export default class GetAllOrdersRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetAllRoute", "/api/orders");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        // const tickets: TicketDocument[] = await GetAllTicketService.getAll();

        res.status(200).send({ tickets: [] });
      }
    );
    return this.app;
  }
}
