import { useQuery } from 'react-query';

import { Discussion } from '../types';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getDiscussions = (): Promise<Discussion[]> => {
  return axios.get('/discussions');
};

type UseDiscussionsOptions = {
  config?: QueryConfig<typeof getDiscussions>;
};

export const useDiscussions = ({ config }: UseDiscussionsOptions = {}) => {
  return useQuery({
    ...config,
    // queryKey: ['discussions'],
    queryFn: () => getDiscussions(),
  });
};
