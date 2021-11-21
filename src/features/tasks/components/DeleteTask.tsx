import { TrashIcon } from '@heroicons/react/outline';

import { useDeleteTask } from '../api/deleteTask';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

type DeleteTaskProps = {
  id: string;
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const deleteTaskMutation = useDeleteTask();

  return (
    <Authorization allowedRoles={[ROLES.admin]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Task"
        body="Are you sure you want to delete this task?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Task
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteTaskMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteTaskMutation.mutateAsync({ taskId: id })}
          >
            Delete Task
          </Button>
        }
      />
    </Authorization>
  );
};
