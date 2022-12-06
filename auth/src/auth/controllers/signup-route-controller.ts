import express, { Request, Response } from "express";
import { body } from "express-validator";
import RouteControllerBase from "../../common/route-controller-base";
import SignupService from "../services/signup-service";
import VerifyIfExistEmail from "../validators/verify-if-exist-email";

export class SignupRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignupRoute");
  }

  configureRoutes(): express.Application {
    this.app.post(
      "/api/users/signup",
      [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
          .isString()
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 character"),
        VerifyIfExistEmail.verifyEmail,
      ],
      async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await SignupService.signup({ email, password });

        console.log(user);
        console.log(await user);

        res.status(201).send({ user });
      }
    );
    return this.app;
  }
}
