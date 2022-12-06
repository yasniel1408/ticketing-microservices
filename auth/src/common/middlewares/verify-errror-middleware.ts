import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

class VerifyErrorMiddleware {
  verify = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  };
}

export default new VerifyErrorMiddleware();
