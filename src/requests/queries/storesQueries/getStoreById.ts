import { StoreByIdModel } from '@/interfaces/storesInterfaces/stores';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getStoreById(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey;
  if (!id) return null;
  try {
    const response = await api.get<StoreByIdModel>(`/admin/stores/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
}

export default function useFetchStoreById(id: string) {
  return useQuery({
    queryKey: ['store-by-id', id],
    queryFn: getStoreById,
    retry: false,
  });
}
