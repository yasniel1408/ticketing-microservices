import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetOrderService } from "@app/orders/usecases";
import { OrderDocument } from "@app/orders/domain/models/order-document";

export default class GetOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "GetOneRoute", "/api/orders/:id");
  }

  configureRoutes(): express.Application {
    this.app.get(
      this.path,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { id } = req.params;

        const order: OrderDocument | null = await GetOrderService.get(id);

        if (!order) throw new NotFoundError();

        if (order.userId !== req.currentUser?.id) throw new NotAuthorizedError();

        res.status(200).send({ order });
      }
    );
    return this.app;
  }
}
