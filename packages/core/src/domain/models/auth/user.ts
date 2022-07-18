import Role from './role';

export interface Name {
  first: string;
  last: string;
}

export default interface User {
  id: string;
  name: Name | string;
  email: string;
  password?: string | null;
  roles: Role[];
}
