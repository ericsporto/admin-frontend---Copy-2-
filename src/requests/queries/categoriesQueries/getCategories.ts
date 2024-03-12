import { CategoriesListModel } from '@/interfaces/categoriesInterfaces/categories';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCategories(ctx: QueryFunctionContext) {
  const [, uuid] = ctx.queryKey;
  if (!uuid) return null;
  try {
    const response = await api.get<CategoriesListModel>(
      `/admin/stores/${uuid}/categories`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCategories(uuid: string) {
  return useQuery({
    queryKey: ['categories', uuid],
    queryFn: getCategories,
    retry: false,
  });
}
