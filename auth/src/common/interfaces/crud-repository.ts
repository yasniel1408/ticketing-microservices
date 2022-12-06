export interface CRUDRepository<M> {
  findAll(limit: number, page: number): Promise<M[]>;
  create(resource: M): Promise<M>;
  editById(id: string, resource: any): Promise<string>;
  getById(id: string): Promise<M>;
  deleteById(id: string): Promise<string>;
}
