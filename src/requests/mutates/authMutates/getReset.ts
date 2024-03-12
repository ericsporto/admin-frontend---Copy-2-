import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ResetCreadentials } from '@/interfaces/authInterfaces/auth';

async function getUserResetPassword(data: ResetCreadentials) {
  try {
    const response = await api.post(`/admin/auth/reset`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useUserResetPassword() {
  return useMutation({ mutationFn: getUserResetPassword });
}
