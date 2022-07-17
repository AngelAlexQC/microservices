import { CONTEXT } from '../../contexts/contexts';

export default interface Permission {
  name: string;
  description: string;
  context: CONTEXT;
}

export const PERMISSIONS: Permission[] = [
  {
    name: '*',
    context: CONTEXT.Auth,
    description: 'All permissions',
  },
];
