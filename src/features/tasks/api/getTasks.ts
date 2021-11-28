import { useQuery } from 'react-query';

import { Task } from '../types';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getTasks = (): Promise<Task[]> => {
  return axios.get('/tasks');
};

type UseTasksOptions = {
  config?: QueryConfig<typeof getTasks>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTasks = ({ config }: UseTasksOptions = {}) => {
  return useQuery(['tasks'], () => getTasks());
};
