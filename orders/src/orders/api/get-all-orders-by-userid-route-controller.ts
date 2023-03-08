import express, { Request, Response } from "express";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetAllOrdersByUserIdService } from "@app/orders/usecases";
import { OrderDocument } from "@app/orders/domain/models/order-document";

export default class GetAllOrdersByUserIdRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetAllRoute", "/api/orders");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const tickets: OrderDocument[] =
          await GetAllOrdersByUserIdService.getAll(req.currentUser?.id!);

        res.status(200).send({ tickets });
      }
    );
    return this.app;
  }
}
