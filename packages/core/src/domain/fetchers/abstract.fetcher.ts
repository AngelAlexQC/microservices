export default interface AbstractFetcher<T> {
  get(url: string): Promise<T>;
}
