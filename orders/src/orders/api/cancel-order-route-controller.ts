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
  OrderStatus,
} from "@common-ticketing-microservices/common";
import {
  VerifyTheExistenceOfTheOrder,
  VerifyTheUserIsTheOwnerOfTheOrder,
} from "@app/orders/common/middlewares";

export default class DeleteOrderRouteController extends RouteControllerBase {
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
        await ChangeStatusOrderToCancelledService.changeStatusToCancelled(
          req.order!
        );

        res.status(200).send({ ticketId: req.order!.id });
      }
    );
    return this.app;
  }
}
