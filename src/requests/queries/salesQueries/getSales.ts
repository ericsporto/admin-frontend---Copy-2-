import { SalesModel } from '@/interfaces/salesInterfaces/sales';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getSales(ctx: QueryFunctionContext) {
  const [
    ,
    company_uuid,
    search,
    start_date,
    end_date,
    payment_method,
    payment_status,
    sale_status,
    delivery_status,
  ] = ctx.queryKey;
  if (!company_uuid) return null;
  let url = `/admin/companies/${company_uuid}/sales?`;

  if (search) {
    url += `&search=${search}`;
  }
  if (start_date) {
    url += `&start_date=${start_date}`;
  }
  if (end_date) {
    url += `&end_date=${end_date}`;
  }
  if (payment_method) {
    url += `&payment_method=${payment_method}`;
  }
  if (payment_status) {
    url += `&payment_status=${payment_status}`;
  }
  if (sale_status) {
    url += `&sale_status=${sale_status}`;
  }
  if (delivery_status) {
    url += `&delivery_status=${delivery_status}`;
  }

  try {
    const response = await api.get<SalesModel>(url);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchSales(
  company_uuid: string,
  search: string,
  start_date: string | undefined,
  end_date: string | undefined,
  payment_method: string,
  payment_status: string,
  sale_status: string,
  delivery_status: string,
) {
  return useQuery({
    queryKey: [
      'sales',
      company_uuid,
      search,
      start_date,
      end_date,
      payment_method,
      payment_status,
      sale_status,
      delivery_status,
    ],
    queryFn: getSales,
    retry: false,
  });
}
