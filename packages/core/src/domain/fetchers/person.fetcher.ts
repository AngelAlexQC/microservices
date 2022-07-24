import Person from '../models/auth/person';
import AbstractFetcher from './abstract.fetcher';

export default interface PersonFetcher extends AbstractFetcher<Person> {
  get(): Promise<Person>;
}
