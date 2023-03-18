export default interface CRUDRepository<M> {
  findAll(limit: number, page: number): Promise<any[]>;
  create(resource: M): Promise<any>;
  editById(id: string, resource: any): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<string>;
}
