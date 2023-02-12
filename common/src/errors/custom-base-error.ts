import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export abstract class CustomBaseError extends Error {
  abstract statusCode: number;

  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, CustomBaseError.prototype);
  }

  abstract serializeError(): IResponseErrorInterface;
}
