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

export const useTasks = ({ config }: UseTasksOptions = {}) => {
  return useQuery({
    ...config,
    // queryKey: ['tasks'],
    queryFn: () => getTasks(),
  });
};
