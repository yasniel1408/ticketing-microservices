import UserResponseDto from "../models/user-response-dto";
import { Request, Response, NextFunction } from "express";
import { VerifyJwt } from "..";

// Esto lo usamos para decirle que busque esta interfaz y le agrege la propiedad de currentUser
declare global {
  namespace Express {
    export interface Request {
      currentUser?: UserResponseDto;
    }
  }
}

class VerifyCurrentUser {
  verify(req: any, res: Response, next: NextFunction) {
    if (!req.session?.jwt) {
      return next();
    }

    try {
      const payload: any = VerifyJwt.verify(req.session.jwt);
      req.currentUser = payload as UserResponseDto;
    } catch (error) {
      next();
    }
    next();
  }
}

export default new VerifyCurrentUser();
