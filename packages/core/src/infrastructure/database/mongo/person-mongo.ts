import { Schema } from 'mongoose';
import Person from '../../../domain/models/auth/person';
import PersonRepository from '../../../domain/repositories/auth/person.repository';
import BaseMongo from './base-mongo';

export default class PersonMongo
  extends BaseMongo<Person>
  implements PersonRepository
{
  constructor() {
    const PersonSchema: Schema<Person> = new Schema({}, { timestamps: true });
    super(PersonSchema, 'Person');
  }
  async getByName(name: string): Promise<Person> {
    const foundDocuments = await this.getBy({ name });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`User with name ${name} not found`);
    }
    return foundDocuments[0];
  }

  async getByDni(dni: string): Promise<Person> {
    const foundDocuments = await this.getBy({ dni });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`User with dni ${dni} not found`);
    }
    return foundDocuments[0];
  }
}
