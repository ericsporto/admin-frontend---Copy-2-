import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

async function KycFiles(data: any) {
  console.log(data);
  try {
    const response = await api.post(`/admin/seller/kyc/files`, {
      headers: { 'content-type': 'multipart/form-data' },
      body: {
        ...data,
      },
    });

    return response;
  } catch (error: any) {
    throw error;
  }
}

export default function useKycFiles() {
  return useMutation({ mutationFn: KycFiles });
}
