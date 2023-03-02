import express, { Request, Response } from "express";
import { SignUpService } from "@app/auth/usecases";
import { UserAuthenticationRequestDto } from "./models";
import {
  CreateJwt,
  RouteControllerBase,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";
import { ValidateBodySignUp } from "./validators";

export default class SignUpRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignupRoute", "/api/users/signup");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      ValidateBodySignUp.validate,
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { email, password }: UserAuthenticationRequestDto = req.body;

        const userCreated = await SignUpService.signup({
          email,
          password,
        });

        // create jwt
        const userJwt = CreateJwt.create(userCreated);

        // guardar el jwt en las cookies
        req.session = {
          jwt: userJwt,
        };

        res.status(201).send({ user: userCreated });
      }
    );
    return this.app;
  }
}
