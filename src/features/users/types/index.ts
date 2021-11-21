import { BaseEntity } from '@/types';

export type User = {
  firstName?: string;
  lastName?: string;
  username: string;
  role: 'admin' | 'user';
  teamId?: string;
  bio?: string;
} & BaseEntity;
