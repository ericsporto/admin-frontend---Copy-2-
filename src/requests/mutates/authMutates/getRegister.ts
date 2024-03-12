import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import {
  RegisterCreadentials,
  TokenModel,
} from '@/interfaces/authInterfaces/auth';

async function getUserRegister(data: RegisterCreadentials) {
  try {
    const response = await api.post<string>(`/admin/auth/register`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useUserRegister() {
  return useMutation({ mutationFn: getUserRegister });
}
