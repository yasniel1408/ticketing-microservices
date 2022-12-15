import { CustomBaseError } from "./custom-base-error";
import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export class BadRequestError extends CustomBaseError {
  statusCode = 400;
  reason: string = "Bad request!";

  constructor(message: string) {
    super(message);
    if(message) this.reason = message;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
