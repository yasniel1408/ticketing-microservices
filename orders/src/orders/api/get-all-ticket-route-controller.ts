import express, { Request, Response } from "express";
import {
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetAllTicketService } from "@app/orders/usecases";
import { TicketDocument } from "@app/orders/domain/models/ticket-document";

export default class GetAllTicketRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetAllRoute", "/api/tickets");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const tickets: TicketDocument[] = await GetAllTicketService.getAll();

        res.status(200).send({ tickets });
      }
    );
    return this.app;
  }
}
