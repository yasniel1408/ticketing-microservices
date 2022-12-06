import { IResponseErrorInterface } from "./interfaces/response-error-interface";
import { CustomBaseError } from "./custom-base-error";

export class DatabaseConnectionError extends CustomBaseError {
  statusCode: number = 500;
  reason: string = "Error connecting to database!";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError(): IResponseErrorInterface {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
