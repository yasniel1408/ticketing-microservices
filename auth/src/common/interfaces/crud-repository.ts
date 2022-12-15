import { HydratedDocument } from "mongoose";

export interface CRUDRepository<M> {
  findAll(limit: number, page: number): Promise<HydratedDocument<M>[]>;
  create(resource: M): Promise<HydratedDocument<M>>;
  editById(id: string, resource: any): Promise<string>;
  getById(id: string): Promise<HydratedDocument<M>>;
  deleteById(id: string): Promise<string>;
}
