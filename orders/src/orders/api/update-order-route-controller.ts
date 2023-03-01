import express, { Request, Response } from "express";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { body } from "express-validator";

export default class UpdateOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "UpdateRoute", "/api/orders/:id");
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
        // const { title, price }: TicketRequestDto = req.body;
        // const { id } = req.params;

        // const wantedTicket = await GetTicketService.get(id);

        // if (!wantedTicket) throw new NotFoundError();

        // if (wantedTicket.userId !== req.currentUser?.id)
        //   throw new NotAuthorizedError();

        // const ticketId: string = await UpdateTicketService.update(id, {
        //   title,
        //   price,
        //   userId: req.currentUser.id,
        // });

        // await new TicketUpdatedPublisher(NatsClientWrapper.client).publish({
        //   id: wantedTicket.id,
        //   title: wantedTicket.title,
        //   price: wantedTicket.price.valueOf(),
        //   userId: wantedTicket.userId,
        // });

        res.status(200).send({ ticketId: 9 });
      }
    );
    return this.app;
  }
}
