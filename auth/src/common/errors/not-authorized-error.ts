import { CustomBaseError } from "./custom-base-error";
import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export default class NotAuthorizedError extends CustomBaseError {
  statusCode = 401;
  reason: string = "Not Authorized!";

  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
