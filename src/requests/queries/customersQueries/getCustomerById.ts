import { CustomerByIdModel } from '@/interfaces/customersInterfaces/customers';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCustomerById(ctx: QueryFunctionContext) {
  const [, company_uuid, customer_uuid] = ctx.queryKey;
  if (!customer_uuid) return null;
  try {
    const response = await api.get<CustomerByIdModel>(
      `/admin/companies/${company_uuid}/customers/${customer_uuid}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCustomerById(
  company_uuid: string,
  customer_uuid: string,
) {
  return useQuery({
    queryKey: ['customer-by-id', company_uuid, customer_uuid],
    queryFn: getCustomerById,
    retry: false,
  });
}
