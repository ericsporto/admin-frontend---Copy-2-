import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

async function logout() {
  try {
    const response = await api.delete(`/admin/auth`);

    return response;
  } catch (error) {
    throw error;
  }
}

export default function useFetchLogout() {
  return useMutation({ mutationFn: logout });
}
