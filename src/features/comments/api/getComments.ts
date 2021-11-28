import { useQuery } from 'react-query';

import { Comment } from '../types';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getComments = ({ discussionId }: { discussionId: string }): Promise<Comment[]> => {
  return axios.get(`/comments`, {
    params: {
      discussionId,
    },
  });
};

type UseCommentsOptions = {
  discussionId: string;
  config?: QueryConfig<typeof getComments>;
};

export const useComments = ({ discussionId }: UseCommentsOptions) => {
  return useQuery(['discussionId', discussionId], () => getComments({ discussionId }));

  // return a;
  // return useQuery({
  //   ...config,
  //   // queryKey: ['comments', discussionId],
  //   queryFn: () => getComments({ discussionId }),
  // });
};
