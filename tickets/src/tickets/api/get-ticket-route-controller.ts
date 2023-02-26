import express, { Request, Response } from "express";
import { param } from "express-validator";
import {
  NotFoundError,
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetTicketService } from "@app/tickets/usecases";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";

export default class GetTicketRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetOneRoute", "/api/tickets/:id");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { id } = req.params;

        const ticket: TicketDocument | null = await GetTicketService.get(id);

        if (!ticket) throw new NotFoundError();

        res.status(200).send({ ticket });
      }
    );
    return this.app;
  }
}
