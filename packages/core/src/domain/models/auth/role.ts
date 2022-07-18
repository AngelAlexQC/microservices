import Permission from './permission';

export default interface Role {
  id: string;

  name: string;
  description: string;
  permissions: Permission[];
}
