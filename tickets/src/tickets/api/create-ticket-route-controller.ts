import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  RequiredUserAuthentication,
  RouteControllerBase,
  VerifyCurrentUser,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";

export default class CreateTicketRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "CreateRoute", "/api/tickets");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      [
        body("title").notEmpty().withMessage("You must supply a title"),
        body("price")
          .isNumeric()
          .notEmpty()
          .withMessage("You must supply a price"),
      ],
      VerifyCurrentUser.verify,
      RequiredUserAuthentication.required,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { title, price }: any = req.body;

        // const userCreated = await SignUpService.signup({
        //   email,
        //   password,
        // });

        // // create jwt
        // const userJwt = CreateJwt.create(userCreated);

        // // guardar el jwt en las cookies
        // req.session = {
        //   jwt: userJwt,
        // };

        res.status(201).send({ ticket: "HOLA" });
      }
    );
    return this.app;
  }
}
