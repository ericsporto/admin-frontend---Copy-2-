import { UserModel } from '@/interfaces/authInterfaces/auth';
import { api } from '@/services/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

async function getCurrent(ctx: QueryFunctionContext) {
  const [, token] = ctx.queryKey;
  if (!token) return;
  try {
    const response = await api.get<UserModel>(`/admin/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useFetchCurrent(token: string) {
  return useQuery({ queryKey: ['current', token], queryFn: getCurrent });
}
