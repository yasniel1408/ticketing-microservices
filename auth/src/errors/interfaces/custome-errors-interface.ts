import { IResponseErrorInterface } from "./response-error-interface";

export interface ICustomErrorsInterface {
  statusCode: number;
  serializeError(): IResponseErrorInterface;
}
