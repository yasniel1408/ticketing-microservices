import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { GetOrderService } from "@app/orders/usecases";
import { OrderRequestDto } from "./models/payment-request-dto";
import { stripe } from "@app/stripe";
import { CreatePaymentService } from "@app/payment/usecases";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import natsClient from "@app/nats-client";

export default class NewOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "NewPaymentRoute", "/api/payments");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      [body("paymentToken").notEmpty(), body("orderId").notEmpty()],
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { paymentToken, orderId }: OrderRequestDto = req.body;

        // verificar que existe la ordern
        const order = await GetOrderService.get(orderId);

        if (!order) throw new NotFoundError();

        //verificar que la orden sea del mismo usuario
        if (order.userId !== req.currentUser?.id)
          throw new NotAuthorizedError();

        // verificar que la orden no este cancelada
        if (order.status === OrderStatus.Cancelled)
          throw new BadRequestError("Cannot pay for an cancelled order!");

        const charge = await stripe.charges.create({
          amount: order.price * 100, // convertirlo a centavos
          currency: "usd",
          source: paymentToken,
          description: "",
        });

        const paymentCreated = await CreatePaymentService.create({
          orderId: order.id,
          stripeId: charge.id,
        });

        await new PaymentCreatedPublisher(natsClient.client).publish({
          id: paymentCreated.id,
          orderId: paymentCreated.orderId,
          stripeId: paymentCreated.stripeId,
        });

        res.status(201).send({ payment: paymentCreated });
      }
    );
    return this.app;
  }
}
