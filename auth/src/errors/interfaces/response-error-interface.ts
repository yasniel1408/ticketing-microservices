export interface IErrorItem {
  message: string;
  field?: string;
}

export interface IResponseErrorInterface {
  errors: IErrorItem[];
}
