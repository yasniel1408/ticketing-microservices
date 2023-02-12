import express, { Request, Response } from "express";
import { body } from "express-validator";
import RouteControllerBase from "@app/common/route-controller-base";
import VerifyIfExistEmail from "./validators/verify-if-exist-email";
import { SignUpService } from "@app/auth/usecases";
import { UserAuthenticationRequestDto } from "./models";
import {
  CreateJwt,
  VerifyErrorMiddleware,
} from "@common-ticketing-microservices/common";

export default class SignUpRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignupRoute", "/api/users/signup");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
      [
        body("email")
          .isEmail()
          .withMessage("Email must be valid")
          .notEmpty()
          .withMessage("You must supply a email"),
        body("password")
          .isString()
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 character")
          .notEmpty()
          .withMessage("You must supply a password"),
        VerifyIfExistEmail.verifyEmail,
      ],
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
