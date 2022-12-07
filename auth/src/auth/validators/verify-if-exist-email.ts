import { NextFunction, Request, Response } from "express";
import { UserDao } from "../../users/models/user-dao";
import { ExistingEmailError } from "../errors/existing-email-error";

class VerifyIfExistEmail {
  verifyEmail = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const user = await UserDao.findOne({ email });

    if (user) {
      throw new ExistingEmailError();
    }
    next();
  };
}

export default new VerifyIfExistEmail();
