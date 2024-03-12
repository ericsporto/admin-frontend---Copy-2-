import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export interface CountriesModel {
  id: string;
  name: string;
  alpha_2_code: string;
  flag: string;
}

async function getCountriesDropdown() {
  try {
    const response = await api.get<CountriesModel[]>(
      `/admin/countries/dropdown`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useFetchCountriesDropdown() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountriesDropdown,
    retry: false,
  });
}
