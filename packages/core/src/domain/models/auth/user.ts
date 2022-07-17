import Role from './role';

export interface Name {
  first: string;
  last: string;
}

export default interface User {
  id: number;
  name: Name | string;
  email: string;
  password: string | null;
  roles: Role[];
}
