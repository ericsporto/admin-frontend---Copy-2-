import { ProductByIdModel } from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCategoryById(ctx: QueryFunctionContext) {
  const [, store_uuid, category_uuid] = ctx.queryKey;
  if (!store_uuid && category_uuid) return;
  try {
    const response = await api.get<ProductByIdModel>(
      `/admin/stores/${store_uuid}/categories/${category_uuid}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCategoryById(
  store_uuid: string,
  category_uuid: string,
) {
  return useQuery({
    queryKey: ['category-by-id', store_uuid, category_uuid],
    queryFn: getCategoryById,
    retry: false,
  });
}
