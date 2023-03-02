import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@common-ticketing-microservices/common";
import { UserDocument } from "@app/auth/domain/models/user-document";
import { GetUserByEmailService } from "@app/auth/usecases";

class VerifyIfExistEmail {
  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user: UserDocument | null = await GetUserByEmailService.getByEmail(
      email
    );

    if (user) {
      throw new BadRequestError("The email is in use!");
    }
    next();
  };
}

export default new VerifyIfExistEmail();
