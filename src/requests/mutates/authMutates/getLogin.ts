import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import {
  LoginCreadentials,
  TokenModel,
} from '@/interfaces/authInterfaces/auth';

async function getUserLogin(data: LoginCreadentials) {
  try {
    const response = await api.post<TokenModel>(`/admin/auth`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useUserLogin() {
  return useMutation({ mutationFn: getUserLogin });
}
