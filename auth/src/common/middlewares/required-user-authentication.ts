import { NotAuthorizedError } from "@app/common/errors";
import { NextFunction, Request, Response } from "express";

class RequiredUserAuthentication {
  required(req: Request, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
    next();
  }
}

export default new RequiredUserAuthentication();
