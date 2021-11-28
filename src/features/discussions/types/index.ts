import { BaseEntity } from '@/types';

export enum DiscussionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export type Discussion = {
  title: string;
  body: string;
  teamId: string;
  status: DiscussionStatus;
} & BaseEntity;
