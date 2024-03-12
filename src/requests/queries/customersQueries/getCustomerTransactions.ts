import { TransactionsByCustomerModel } from '@/interfaces/customersInterfaces/customers';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCustomerTransactions(ctx: QueryFunctionContext) {
  const [, company_uuid, customer_uuid] = ctx.queryKey;
  if (!customer_uuid) return null;
  try {
    const response = await api.get<TransactionsByCustomerModel>(
      `/admin/companies/${company_uuid}/customers/${customer_uuid}/sales`,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCustomerTransactions(
  company_uuid: string | undefined,
  customer_uuid: string,
) {
  return useQuery({
    queryKey: ['customer-transactions', company_uuid, customer_uuid],
    queryFn: getCustomerTransactions,
    retry: false,
  });
}
