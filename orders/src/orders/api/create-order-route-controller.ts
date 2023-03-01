import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import mongoose from "mongoose";

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
        // const { title, price }: TicketRequestDto = req.body;

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
