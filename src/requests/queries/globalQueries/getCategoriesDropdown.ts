import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCategoriesDropdown(ctx: QueryFunctionContext) {
  const [, uuid] = ctx.queryKey;
  if (!uuid) return;
  try {
    const response = await api.get(`/admin/stores/${uuid}/categories/dropdown`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCategoriesDropdown(uuid: string) {
  return useQuery({
    queryKey: ['categories-dropdown', uuid],
    queryFn: getCategoriesDropdown,
    retry: false,
  });
}
