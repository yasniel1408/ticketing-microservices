import express, {Request, Response} from "express";
import {body} from "express-validator";
import RouteControllerBase from "../../../common/route-controller-base";
import SignupService from "../../services/signup-service";
import VerifyIfExistEmail from "../validators/verify-if-exist-email";
import jwt from "jsonwebtoken";
import {UserSignupRequestDto} from "../models/user-signup-request-dto";
import {UserSignupResponseDto} from "../models/user-signup-response-dto";

export class SignupRouteController extends RouteControllerBase {
  constructor(app: express.Application) {
    super(app, "SignupRoute", "/api/users/signup");
  }

  configureRoutes(): express.Application {
    this.app.post(
      this.path,
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
        const { email, password }: UserSignupRequestDto = req.body;

        const userCreated: UserSignupResponseDto = await SignupService.signup({
          email,
          password,
        });

        // create jwt
        const userJwt = jwt.sign(
          {
            id: userCreated._id,
            email: userCreated.email,
          },
          process.env.JWT_KEY!
        );

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
