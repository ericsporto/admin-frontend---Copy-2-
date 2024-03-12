import { ProductsListModel } from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getProducts(ctx: QueryFunctionContext) {
  const [, uuid] = ctx.queryKey;
  if (!uuid) return;
  try {
    const response = await api.get<ProductsListModel>(
      `/admin/stores/${uuid}/products`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchProducts(uuid: string) {
  return useQuery({
    queryKey: ['products', uuid],
    queryFn: getProducts,
    retry: false,
  });
}
