import { useMutation } from 'react-query';

import { Task } from '../types';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

export type CreateTaskDTO = {
  data: {
    title: string;
    description: string;
  };
};

export const createTask = ({ data }: CreateTaskDTO): Promise<Task> => {
  return axios.post(`/tasks`, data);
};

type UseCreateTaskOptions = {
  config?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({ config }: UseCreateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newTask) => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      queryClient.setQueryData('tasks', [...(previousTasks || []), newTask.data]);

      return { previousTasks };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData('tasks', context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      addNotification({
        type: 'success',
        title: 'Task Created',
      });
    },
    ...config,
    mutationFn: createTask,
  });
};
