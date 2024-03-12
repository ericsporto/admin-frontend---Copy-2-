import { CompanyDocsModel } from '@/interfaces/companiesInterfaces/companies';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCompanyDocs(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey;
  if (!id) return null;
  try {
    const response = await api.get<CompanyDocsModel>(
      `/admin/companies/${id}/kyb/files`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCompanyDocs(id: string) {
  return useQuery({
    queryKey: ['company-docs', id],
    queryFn: getCompanyDocs,
    retry: false,
  });
}
