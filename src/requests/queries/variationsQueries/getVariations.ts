import { VariationsListModel } from '@/interfaces/variationsInterfaces/variations';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getVariations(ctx: QueryFunctionContext) {
  const [, store_uuid, product_uuid] = ctx.queryKey;
  if (!store_uuid || !product_uuid) return null;
  try {
    const response = await api.get<VariationsListModel>(
      `/admin/stores/${store_uuid}/products/${product_uuid}/variations`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchVariations(
  store_uuid: string,
  product_uuid: string,
) {
  return useQuery({
    queryKey: ['variations', store_uuid, product_uuid],
    queryFn: getVariations,
    retry: false,
  });
}
