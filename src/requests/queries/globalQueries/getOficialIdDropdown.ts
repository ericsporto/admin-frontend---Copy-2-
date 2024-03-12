import { OficialId } from '@/interfaces/oficialIdInterfaces/oficialId';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getOfficialIdDropdown(ctx: QueryFunctionContext) {
  const [, country, usable] = ctx.queryKey;
  if (!country) return;
  try {
    const response = await api.get<OficialId[]>(
      `/admin/official-id-types/dropdown?country_id=${country}&usable_by=${usable}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchOficialIdDropdown(country: string, usable: string) {
  return useQuery({
    queryKey: ['oficialId-dropdown', country, usable],
    queryFn: getOfficialIdDropdown,
    retry: false,
  });
}
