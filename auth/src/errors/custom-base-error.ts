import { IResponseErrorInterface } from "./interfaces/response-error-interface";

export abstract class CustomBaseError extends Error {
  abstract statusCode: number;

  constructor() {
    super();
  }

  abstract serializeError(): IResponseErrorInterface;
}
