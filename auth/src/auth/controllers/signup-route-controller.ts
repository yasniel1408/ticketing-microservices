import express, { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import RouteControllerBase from "../../common/route-controller-base";
import SignupService from "../services/signup-service";
import VerifyIfExistEmail from "../validators/verify-if-exist-email";
import VerifyErrorMiddleware from "../../common/middlewares/verify-errror-middleware";
import {RequestValidationError} from "../../common/errors/request-validation-error";

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
        VerifyIfExistEmail.verifyEmail
      ],
      async (req: Request, res: Response) => {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              throw new RequestValidationError(errors.array());
          }

        const { email, password } = req.body;

        const user = await SignupService.signup({ email, password });

        res.status(201).send({ user });
      }
    );
    return this.app;
  }
}
