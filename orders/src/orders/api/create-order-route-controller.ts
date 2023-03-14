import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";
import { ExistTicketService } from "@app/tickets/usecases";
import {
  CreateOrderService,
  GetOrderByTicketNotCancelledService,
} from "@app/orders/usecases";

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

        // Salvar la orden en base de datos para el ticket que le pasamos con el user actual
        const order = await CreateOrderService.create(
          ticketId,
          req.currentUser?.id!
        );
        if (!order) {
          throw new BadRequestError(
            `The ticket with id ${ticketId} do not has order`
          );
        }

        // await new TicketCreatedPublisher(NatsClientWrapper.client).publish({
        //   id: ticketCreated.id,
        //   price: ticketCreated.price.valueOf(),
        //   title: ticketCreated.title,
        //   userId: ticketCreated.userId,
        // });

        res.status(201).send({ order });
      }
    );
    return this.app;
  }
}
