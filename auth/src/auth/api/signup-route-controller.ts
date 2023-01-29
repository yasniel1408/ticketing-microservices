import express, { Request, Response } from "express";
import { body } from "express-validator";
import RouteControllerBase from "../../common/route-controller-base";
import SignupService from "../usecases/signup-service";
import VerifyIfExistEmail from "./validators/verify-if-exist-email";
import { UserAuthenticationRequestDto } from "./models/user-authentication-request-dto";
import VerifyErrorMiddleware from "../../common/middlewares/verify-error-middleware";
import CreateJwt from "../../common/helpers/create-jwt";

export class SignUpRouteController extends RouteControllerBase {
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

        const userCreated = await SignupService.signup({
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
