import { TrashIcon } from '@heroicons/react/outline';

import { IconButton } from '../../../components/Elements/IconButton';
import { useDeleteDiscussion } from '../api/deleteDiscussion';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const deleteDiscussionMutation = useDeleteDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.admin]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={<IconButton variant="danger" icon={<TrashIcon className="h-4 w-4" />} />}
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteDiscussionMutation.mutateAsync({ discussionId: id })}
          >
            Delete Discussion
          </Button>
        }
      />
    </Authorization>
  );
};
