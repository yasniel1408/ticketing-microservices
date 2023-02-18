import { NextFunction, Request, Response } from "express";
import { IResponseErrorInterface } from "../errors/interfaces/response-error-interface";
import { CustomBaseError } from "../errors/custom-base-error";

class ErrorHandlerMiddleware {
  handler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomBaseError) {
      return res.status(err.statusCode).send(err.serializeError());
    }

    console.error(err);

    res.status(400).send({
      errors: [{ message: err.message }],
    } as IResponseErrorInterface);
  };
}

export default new ErrorHandlerMiddleware();
