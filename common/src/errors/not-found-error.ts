import { CustomBaseError } from "./custom-base-error";
import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export default class NotFoundError extends CustomBaseError {
  statusCode = 404;
  reason: string = "Not Found Resource!";

  constructor() {
    super();

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
