import express, { Request, Response } from "express";
import { body } from "express-validator";
import VerifyErrorMiddleware from "../../../common/middlewares/verify-error-middleware";
import RouteControllerBase from "../../../common/route-controller-base";
import { UserSignupRequestDto } from "../models/user-signup-request-dto";

export class SignInRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignInRoute", "/api/users/signin");
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
          .trim()
          .notEmpty()
          .withMessage("You must supply a password"),
      ],
      VerifyErrorMiddleware.verify,
      async (req: Request, res: Response) => {
        const { email, password }: UserSignupRequestDto = req.body;

        res.status(200).send({ user: { email, password } });
      }
    );
    return this.app;
  }
}
