import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ForgotCreadentials } from '@/interfaces/authInterfaces/auth';

async function getUserForgot(data: ForgotCreadentials) {
  try {
    const response = await api.post(`/admin/auth/forgot`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useUserForgot() {
  return useMutation({ mutationFn: getUserForgot });
}
