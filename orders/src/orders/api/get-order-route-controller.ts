import express, { Request, Response } from "express";
import { OrderDocument } from "@app/orders/domain/models/order-document";
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

export default class GetOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetOneRoute", "/api/orders/:id");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyTheExistenceOfTheOrder.verify,
      VerifyTheUserIsTheOwnerOfTheOrder.verify,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const order: OrderDocument | undefined = req.order;

        res.status(200).send({ order });
      }
    );
    return this.app;
  }
}
