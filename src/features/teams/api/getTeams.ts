import { useQuery } from 'react-query';

import { Team } from '../types';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getTeams = (): Promise<Team[]> => {
  return axios.get('/teams');
};

type UseTeamsOptions = {
  config?: QueryConfig<typeof getTeams>;
};

export const useTeams = ({ config = {} }: UseTeamsOptions = {}) => {
  return useQuery({
    ...config,
    // queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
};
