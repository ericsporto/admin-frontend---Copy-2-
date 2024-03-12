import { CompanyTaxModel } from '@/interfaces/companiesInterfaces/companies';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCompanyTax(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey;
  if (!id) return null;
  try {
    const response = await api.get<CompanyTaxModel>(
      `/admin/companies/${id}/tax-plans`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCompanyTax(id: string) {
  return useQuery({
    queryKey: ['company-tax-plans', id],
    queryFn: getCompanyTax,
    retry: false,
  });
}
