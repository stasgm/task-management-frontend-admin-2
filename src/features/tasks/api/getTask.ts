import { useQuery } from 'react-query';

import { Task } from '../types';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getTask = ({ taskId }: { taskId: string }): Promise<Task> => {
  return axios.get(`/tasks/${taskId}`);
};

type UseTaskOptions = {
  taskId: string;
  config?: QueryConfig<typeof getTask>;
};

export const useTask = ({ taskId, config }: UseTaskOptions) => {
  return useQuery({
    ...config,
    // queryKey: ['task', taskId],
    queryFn: () => getTask({ taskId }),
  });
};
