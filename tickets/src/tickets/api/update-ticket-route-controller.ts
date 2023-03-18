import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetTicketService, UpdateTicketService } from "@app/tickets/usecases";
import { body } from "express-validator";
import { TicketRequestDto } from "./models/ticket-request-dto";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import NatsClientWrapper from "@app/nats-client";
import { TicketDocument } from "../domain/models/ticket-document";

export default class UpdateTicketRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "UpdateRoute", "/api/tickets/:id");
  }

  configureRoutes(): express.Application {
    this.app.put(
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
        const { id } = req.params;

        const wantedTicket = await GetTicketService.get(id);

        if (!wantedTicket) throw new NotFoundError();

        if (wantedTicket.userId !== req.currentUser?.id)
          throw new NotAuthorizedError();

        const ticketUpdated: TicketDocument = await UpdateTicketService.update(
          id,
          {
            title,
            price,
            userId: req.currentUser.id,
          }
        );
        console.log(ticketUpdated);

        await new TicketUpdatedPublisher(NatsClientWrapper.client).publish({
          id: ticketUpdated.id,
          title: ticketUpdated.title,
          price: ticketUpdated.price.valueOf(),
          userId: ticketUpdated.userId,
          version: ticketUpdated.version!,
        });

        res.status(200).send({ ticket: ticketUpdated });
      }
    );
    return this.app;
  }
}
