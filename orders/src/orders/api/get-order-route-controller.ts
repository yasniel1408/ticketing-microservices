import express, { Request, Response } from "express";
import {
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";

export default class GetOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetOneRoute", "/api/orders/:id");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        // const { id } = req.params;

        // const ticket: TicketDocument | null = await GetTicketService.get(id);

        // if (!ticket) throw new NotFoundError();

        res.status(200).send({ ticket: {} });
      }
    );
    return this.app;
  }
}
