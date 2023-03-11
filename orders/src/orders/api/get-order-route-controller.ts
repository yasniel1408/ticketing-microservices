import express, { Request, Response } from "express";
import {
  RouteControllerBase,
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
      VerifyTheExistenceOfTheOrder.verify,
      VerifyTheUserIsTheOwnerOfTheOrder.verify,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        res.status(200).send({ order: req.order });
      }
    );
    return this.app;
  }
}
