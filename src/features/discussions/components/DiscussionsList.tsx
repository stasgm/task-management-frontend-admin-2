import { useDiscussions } from '../api/getDiscussions';
import { Discussion } from '../types';

import { DeleteDiscussion } from './DeleteDiscussion';

import { Table, Spinner, Link } from '@/components/Elements';
import { formatDateShort } from '@/utils/format';

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions();

  if (discussionsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!discussionsQuery.data) return null;

  return (
    <Table<Discussion>
      data={discussionsQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title',
          Cell({ entry: { id, title } }) {
            return <Link to={`./${id}`}>{title}</Link>;
          },
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDateShort(createdAt)}</span>;
          },
        },
        {
          title: 'Updated At',
          field: 'updatedAt',
          Cell({ entry: { updatedAt } }) {
            return <span>{formatDateShort(updatedAt)}</span>;
          },
        },
        {
          title: 'Status',
          field: 'status',
          Cell({ entry: { status } }) {
            return <span>{status}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteDiscussion id={id} />;
          },
        },
      ]}
    />
  );
};
