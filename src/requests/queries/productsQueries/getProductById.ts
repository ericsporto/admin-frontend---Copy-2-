import { ProductByIdModel } from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getProductById(ctx: QueryFunctionContext) {
  const [, store_uuid, product_uuid] = ctx.queryKey;
  if (!store_uuid && product_uuid) return;
  try {
    const response = await api.get<ProductByIdModel>(
      `/admin/stores/${store_uuid}/products/${product_uuid}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchProductById(
  store_uuid: string,
  product_uuid: string,
) {
  return useQuery({
    queryKey: ['product-by-id', store_uuid, product_uuid],
    queryFn: getProductById,
    retry: false,
  });
}
