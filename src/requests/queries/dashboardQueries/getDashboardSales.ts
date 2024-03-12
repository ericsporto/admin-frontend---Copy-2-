import { DashSalesModel } from '@/interfaces/dashInterfaces/dash';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getDashboardSales(ctx: QueryFunctionContext) {
  const [, company_uuid, start_date, end_date] = ctx.queryKey;
  if(!company_uuid || typeof company_uuid !== 'string') return null

  let url = `/admin/dashboard/sales?company_id=${company_uuid}`;

  if (start_date) {
    url += `&start_date=${start_date}`;
  }
  if (end_date) {
    url += `&end_date=${end_date}`;
  }

  try {
    const response = await api.get<DashSalesModel>(url);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchDashboardSales(
  company_uuid: string,
  start_date: string | undefined,
  end_date: string | undefined,
) {
  return useQuery({
    queryKey: ['dashboard-sales', company_uuid, start_date, end_date],
    queryFn: getDashboardSales,
    retry: false,
  });
}
