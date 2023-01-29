import { UserResponseDto } from "auth/api/models";
import { VerifyJwt } from "common/helpers";
import { Request, Response, NextFunction } from "express";

// Esto lo usamos para decirle que busque esta interfaz y le agrege la propiedad de currentUser
declare global {
  namespace Express {
    export interface Request {
      currentUser?: UserResponseDto;
    }
  }
}

class VerifyCurrentUser {
  verify(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.jwt) {
      return next();
    }

    try {
      const payload: UserResponseDto = VerifyJwt.verify(req.session.jwt);
      req.currentUser = payload as UserResponseDto;
      return res.status(200).send({ user: null });
    } catch (error) {
      return next();
    }
  }
}

export default new VerifyCurrentUser();
