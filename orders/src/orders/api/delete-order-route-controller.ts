import express, { Request, Response } from "express";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { body } from "express-validator";

export default class DeleteOrderRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "UpdateRoute", "/api/orders/:id");
  }

  configureRoutes(): express.Application {
    this.app.delete(
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
        
        res.status(200).send({ ticketId: 9 });
      }
    );
    return this.app;
  }
}
