import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { ExistTicketService } from "@app/tickets/usecases";
import { GetOrderByTicketNotCancelledService } from "@app/orders/usecases";

export default class CreateOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "CreateRoute", "/api/orders");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      [
        body("ticketId")
          .notEmpty()
          .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // de esta manera validamos que el id sea un id de mongo real
          .withMessage("You must supply a ticketId"),
        body("title").notEmpty().withMessage("You must supply a title"),
        body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
      ],
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { ticketId } = req.body;

        // Buscar el ticket del usuario que deberia ya existir antes de crear la orden ya que cada vez que se cree un ticket se dispara un evento para que se cree en esta base de datos de este servicio
        const isExistTicket = await ExistTicketService.exist(ticketId);
        if (!isExistTicket) {
          throw new NotFoundError();
        }

        // Asegurarnos de que el ticket no este reservado por otro usuario ni este cancelado
        // Si encontramos un order significa que este boleto esta reservado para este ticket que le pasamos
        const existingOrder = await GetOrderByTicketNotCancelledService.get(
          ticketId
        );
        if (existingOrder) {
          throw new BadRequestError(
            `The ticket with id ${ticketId} is already reserved`
          );
        }

        // const ticketCreated: TicketDocument = await CreateTicketService.create({
        //   title,
        //   price,
        //   userId: req.currentUser!.id,
        // });

        // await new TicketCreatedPublisher(NatsClientWrapper.client).publish({
        //   id: ticketCreated.id,
        //   title: ticketCreated.title,
        //   price: ticketCreated.price.valueOf(),
        //   userId: ticketCreated.userId,
        // });

        res.status(201).send({ ticket: "ticketCreated" });
      }
    );
    return this.app;
  }
}
