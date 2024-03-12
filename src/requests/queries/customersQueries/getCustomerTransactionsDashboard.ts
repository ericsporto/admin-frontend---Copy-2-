import { CustomerDashboardModel } from '@/interfaces/customersInterfaces/customers';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCustomerTransactionsDashboard(ctx: QueryFunctionContext) {
  const [, company_uuid, customer_uuid] = ctx.queryKey;
  if (!customer_uuid) return null;
  try {
    const response = await api.get<CustomerDashboardModel>(
      `/admin/companies/${company_uuid}/customers/${customer_uuid}/sales/dashboard`,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCustomerTransactionsDashboard(
  company_uuid: string | undefined,
  customer_uuid: string,
) {
  return useQuery({
    queryKey: ['customer-transactions-dashboard', company_uuid, customer_uuid],
    queryFn: getCustomerTransactionsDashboard,
    retry: false,
  });
}
