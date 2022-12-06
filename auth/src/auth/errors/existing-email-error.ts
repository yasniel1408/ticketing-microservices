import { CustomBaseError } from "../../common/errors/custom-base-error";
import { IResponseErrorInterface } from "../../common/errors/interfaces/response-error-interface";

export class ExistingEmailError extends CustomBaseError {
  statusCode = 404;
  reason: string = "Not Found Resource!";

  constructor() {
    super();

    Object.setPrototypeOf(this, ExistingEmailError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
