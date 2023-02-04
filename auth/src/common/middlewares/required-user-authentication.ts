import { NotAuthorizedError } from "@app/common/errors";
import { NextFunction, Request, Response } from "express";

// este es el middleware que vamos a usar para verificar que el user este logeado
class RequiredUserAuthentication {
  required(req: Request, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
    next();
  }
}

export default new RequiredUserAuthentication();
