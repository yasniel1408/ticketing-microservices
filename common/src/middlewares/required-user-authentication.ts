import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "..";

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
