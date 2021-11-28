import { BaseEntity } from '@/types';

export type Comment = {
  body: string;
  userId: string;
  discussionId: string;
} & BaseEntity;
