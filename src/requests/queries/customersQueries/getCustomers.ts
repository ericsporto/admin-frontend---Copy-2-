import { CustomersByCompanyListModel } from '@/interfaces/customersInterfaces/customers';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCustomers(ctx: QueryFunctionContext) {
  const [, company_uuid] = ctx.queryKey;
  if (!company_uuid) return null;
  try {
    const response = await api.get<CustomersByCompanyListModel>(
      `/admin/companies/${company_uuid}/customers`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCustomers(company_uuid: string) {
  return useQuery({
    queryKey: ['customers', company_uuid],
    queryFn: getCustomers,
    retry: false,
  });
}
