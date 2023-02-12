import { ValidationError } from "express-validator";
import { IResponseErrorInterface } from "./interfaces/response-error-interface";
import { CustomBaseError } from "./custom-base-error";

export default class RequestValidationError extends CustomBaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    const formattedError = this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));

    return {
      errors: formattedError,
    };
  }
}
