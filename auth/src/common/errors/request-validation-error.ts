import { ValidationError } from "express-validator";
import { CustomBaseError } from "./custom-base-error";
import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export class RequestValidationError extends CustomBaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    console.log(this.errors);
    const formattedError = this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));

    return {
      errors: formattedError,
    };
  }
}
