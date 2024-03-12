import { StoresListModel } from '@/interfaces/storesInterfaces/stores';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

async function getStores() {
  try {
    const response = await api.get<StoresListModel>(`/admin/stores`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    retry: false,
  });
}
