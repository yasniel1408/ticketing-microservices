import express, { Request, Response } from "express";
import { OrderDocument } from "@app/orders/domain/models/order-document";
import {
  ChangeStatusOrderToCancelledService,
  GetOrderService,
} from "@app/orders/usecases";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import {
  VerifyTheExistenceOfTheOrder,
  VerifyTheUserIsTheOwnerOfTheOrder,
} from "@app/orders/common/middlewares";
import {OrderCancelledPublisher} from "@app/orders/events/publishers/order-cancelled-publisher";
import NatsClientWrapper from "@app/nats-client";

export default class CancelledOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "UpdateRoute", "/api/orders/:id");
  }

  configureRoutes(): express.Application {
    this.app.patch(
      this.path,
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      VerifyTheExistenceOfTheOrder.verify,
      VerifyTheUserIsTheOwnerOfTheOrder.verify,
      async (req: Request, res: Response) => {

        const order = req.order!

        await ChangeStatusOrderToCancelledService.changeStatusToCancelled(
          order
        );

        // publicar el evento cuando se le cambia el status a la orden
         await new OrderCancelledPublisher(NatsClientWrapper.client).publish({
           id: order.id,
           ticket: {
             id: order.ticket.id,
           }
         });

        res.status(200).send({ order });
      }
    );
    return this.app;
  }
}
