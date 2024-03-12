import { CompaniesDropdownModel } from '@/interfaces/companiesInterfaces/companies';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCompaniesDropdown(ctx: QueryFunctionContext) {
  const [, search] = ctx.queryKey;
  try {
    if (search) {
      const response = await api.get<CompaniesDropdownModel[]>(
        `/admin/companies/dropdown?search=${search}&active=1&selected_first=1`,
      );
      return response.data;
    } else {
      const response = await api.get<CompaniesDropdownModel[]>(
        `/admin/companies/dropdown?active=1&selected_first=1`,
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export default function useFetchCompaniesDropdown(
  search?: string,
) {
  return useQuery({
    queryKey: ['companies-dropdown', search],
    queryFn: getCompaniesDropdown,
    retry: false,
  });
}
