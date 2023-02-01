import { NextFunction, Request, Response } from "express";
import { UserDao } from "@app/auth/domain/models/user-dao";
import { BadRequestError } from "@app/common/errors";

class VerifyIfExistEmail {
  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await UserDao.findOne({ email });

    if (user) {
      throw new BadRequestError("The email is in use!");
    }
    next();
  };
}

export default new VerifyIfExistEmail();
