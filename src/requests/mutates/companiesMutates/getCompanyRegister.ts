import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { CreateCompanyResponseModel, RegisterCompaniesCreadentials } from '@/interfaces/companiesInterfaces/companies';

async function getCompanyRegister(data: RegisterCompaniesCreadentials) {
  try {
    const response = await api.post<CreateCompanyResponseModel>(`/admin/companies`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useCompanyRegister() {
  return useMutation({ mutationFn: getCompanyRegister });
}
