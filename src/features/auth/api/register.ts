import { UserResponse } from '../types';

import { axios } from '@/lib/axios';

export type RegisterCredentialsDTO = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export const registerWithUsernameAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post('/auth/signup', data);
};
