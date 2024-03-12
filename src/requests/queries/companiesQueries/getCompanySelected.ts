import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

async function getCompanySelected() {

  try {
    const response = await api.get<string>(
      `/admin/companies/selected`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCompanySelected() {
  return useQuery({
    queryKey: ['company-selected'],
    queryFn: getCompanySelected,
    retry: false,
  });
}
