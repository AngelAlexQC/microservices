import Person from '../../models/auth/person';
import AbstractRepository from '../abstract.repository';

export default interface PersonRepository extends AbstractRepository<Person> {
  getByName(name: string): Promise<Person>;
  getByDni(dni: string): Promise<Person>;
}
