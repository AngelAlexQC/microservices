export default interface AbstractRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  getBy(query: object): Promise<T[]>;
  create(object: T): Promise<T>;
  update(id: string, object: T): Promise<T>;
  patch(id: string, object: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
