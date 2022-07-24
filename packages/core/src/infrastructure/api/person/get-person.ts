import { Request, Response } from 'express';
import { personURL } from '../../../config/common';
import { getPerson } from '../../../domain/interactors/person/getPerson';
import PersonMongo from '../../database/mongo/person-mongo';
import PersonFetcher from '../../fetchers/person-fetch';

export const getPersonHandler = async (req: Request, res: Response) => {
  const personRepository = new PersonMongo();
  const personFetcher = new PersonFetcher(personURL);
  const getPersonFn = getPerson(personRepository, personFetcher);
  const { dni } = req.params;
  const person = await getPersonFn(dni);
  return res.json(person);
};
