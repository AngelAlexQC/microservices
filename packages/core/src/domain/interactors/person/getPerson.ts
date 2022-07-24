import PersonFetcher from '../../fetchers/person.fetcher';
import Person from '../../models/auth/person';
import PersonRepository from '../../repositories/auth/person.repository';

export const getPerson =
  (personRepository: PersonRepository, personFetcher: PersonFetcher) =>
  async (dni: string): Promise<Person> => {
    let person;
    try {
      person = await personRepository.getByDni(dni);
      const birthDate = new Date(person.birthDate);
      // Check if updatedAt is more than 1 week ago
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (birthDate.getTime() < oneWeekAgo.getTime()) {
        // Update person
        const personFromApi = await personFetcher.get();
        return personRepository.update(person.id, personFromApi);
      }
    } catch (error) {
      const personFromApi = await personFetcher.get();
      if (personFromApi) {
        person = await personRepository.create(personFromApi);
      } else {
        throw new Error('Person not found');
      }
    }
    return person;
  };
