import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { CreateTicketService } from "@app/tickets/usecases";
import { TicketRequestDto } from "./models/ticket-request-dto";
import { TicketDocument } from "@app/tickets/domain/models/ticket-document";

export default class CreateTicketRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "CreateRoute", "/api/tickets");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      [
        body("title").notEmpty().withMessage("You must supply a title"),
        body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
      ],
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { title, price }: TicketRequestDto = req.body;

        const ticketCreated: TicketDocument = await CreateTicketService.create({
          title,
          price,
          userId: req.currentUser!.id,
        });

        res.status(201).send({ ticket: ticketCreated });
      }
    );
    return this.app;
  }
}
