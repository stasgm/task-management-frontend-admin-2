import { useMutation } from 'react-query';

import { Task } from '../types';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

export type UpdateTaskDTO = {
  data: {
    title: string;
    description: string;
  };
  taskId: string;
};

export const updateTask = ({ data, taskId }: UpdateTaskDTO): Promise<Task> => {
  return axios.patch(`/tasks/${taskId}`, data);
};

type UseUpdateTaskOptions = {
  config?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ config }: UseUpdateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingTask: any) => {
      await queryClient.cancelQueries(['task', updatingTask?.taskId]);

      const previousTask = queryClient.getQueryData<Task>(['task', updatingTask?.taskId]);

      queryClient.setQueryData(['task', updatingTask?.taskId], {
        ...previousTask,
        ...updatingTask.data,
        id: updatingTask.taskId,
      });

      return { previousTask };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTask) {
        queryClient.setQueryData(['task', context.previousTask.id], context.previousTask);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['task', data.id]);
      addNotification({
        type: 'success',
        title: 'Task Updated',
      });
    },
    ...config,
    mutationFn: updateTask,
  });
};
