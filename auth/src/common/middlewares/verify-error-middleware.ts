import { RequestValidationError } from "@app/common/errors";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class VerifyErrorMiddleware {
  verify = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    next();
  };
}

export default new VerifyErrorMiddleware();
