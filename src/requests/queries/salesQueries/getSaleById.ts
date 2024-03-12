import { ProductByIdModel } from '@/interfaces/productsInterfaces/products';
import { SaleByIdModel } from '@/interfaces/salesInterfaces/sales';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getSaleById(ctx: QueryFunctionContext) {
  const [, company_uuid, sale_uuid] = ctx.queryKey;
  if (!company_uuid && sale_uuid) return;
  try {
    const response = await api.get<SaleByIdModel>(
      `/admin/companies/${company_uuid}/sales/${sale_uuid}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchSaleById(
  company_uuid: string | undefined,
  sale_uuid: string,
) {
  return useQuery({
    queryKey: ['sale-by-id', company_uuid, sale_uuid],
    queryFn: getSaleById,
    retry: false,
  });
}
