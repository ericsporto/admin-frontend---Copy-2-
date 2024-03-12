import { VariationByIdModel } from '@/interfaces/variationsInterfaces/variations';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getVariationById(ctx: QueryFunctionContext) {
  const [, store_uuid, product_uuid, variation_uuid] = ctx.queryKey;
  if (!store_uuid && product_uuid) return;
  try {
    const response = await api.get<VariationByIdModel>(
      `/admin/stores/${store_uuid}/products/${product_uuid}/variations/${variation_uuid}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchVariationById(
  store_uuid: string,
  product_uuid: string,
  variation_uuid: string,
) {
  return useQuery({
    queryKey: ['variation-by-id', store_uuid, product_uuid, variation_uuid],
    queryFn: getVariationById,
    retry: false,
  });
}
