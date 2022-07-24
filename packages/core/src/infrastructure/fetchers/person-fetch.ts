import { personURL } from '../../config/common';
import AbstractFetcher from '../../domain/fetchers/abstract.fetcher';
import Person from '../../domain/models/auth/person';

export default class PersonFetcher implements AbstractFetcher<Person> {
  private url: string;
  constructor(dni: string) {
    const today = new Date().toISOString().split('T')[0];
    this.url = personURL + dni + '/' + today;
  }
  async get(): Promise<Person> {
    const person = await fetch(this.url);
    const personJson = await person.text();
    console.log(personJson);
    return JSON.parse(personJson);
  }
}
