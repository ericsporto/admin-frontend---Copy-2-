'use client';

import ShowInformationCard from '@/components/CompanyConfig/ShowInformationCard';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import Spinner from '@/components/Global/Spinner';
import useResponse from '@/hooks/useResponse';
import getCompanyDocs from '@/requests/queries/companiesQueries/getCompanyDocs';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import { api } from '@/services/api';
import useUserStore from '@/stores/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CgInfo } from 'react-icons/cg';
import { MdOutlineUploadFile } from 'react-icons/md';

function CompanyConfig() {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { data: company } = useFetchCompaniesDropdown();
  const { data: docs } = getCompanyDocs(
    user?.user.has_company && company ? (company[0].id as string) : '',
  );
  const queryClient = useQueryClient();
  const { showSuccess } = useResponse();

  const docsVerify =
    docs?.files[0]?.tags?.includes('approved') &&
    docs?.files[1]?.tags?.includes('approved') &&
    docs?.files[2]?.tags?.includes('approved') &&
    docs?.files[3]?.tags?.includes('approved')
      ? true
      : false;

  const handleRedirectToDocs = () => {
    router.push(`/${locale}/companies/uploadDocuments`);
  };

  const submit = async () => {
    setIsLoading(true);
    const payload = {
      trading_name: name ?? docs?.trading_name,
    };

    try {
      await api.put(`/admin/companies/${company && company[0].id}`, payload);
      queryClient.invalidateQueries({ queryKey: ['company-docs'] });
      showSuccess('Empresa editada com sucesso!');
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col xl:items-start w-full xl:justify-start">
        <h1 className="text-green-50 text-2xl font-bold text-center xl:text-left">
          Configurações da empresa
        </h1>
      </div>
      <div className="flex flex-col rounded-[20px] bg-gray-200 mt-8 xl:w-[680px] p-8">
        <h1 className="text-white-50 text-xl font-medium">Dados principais</h1>
        <p className="text-white-50 text-base font-light pb-8 pt-3">
          Configure as informações essenciais relacionadas à sua empresa.
        </p>
        <div className="flex flex-col space-y-6">
          <ShowInformationCard
            label="CPF/CNPJ*"
            information={docs?.official_id_number}
          />
          <ShowInformationCard
            label="Nome da empresa*"
            information={docs?.business_name}
          />
          <ShowInformationCard label="País*" information={docs?.country.name} />
          <CustomInput
            type="text"
            label="Nome fantasia*"
            h="40px"
            onChange={(e) => setName(e.target.value)}
            defaultValue={docs?.trading_name}
            textColor="white"
          />
        </div>
      </div>
      <div className="flex flex-col rounded-[20px] bg-gray-200 mt-8 xl:w-[680px] p-8">
        <h1 className="text-white-50 text-xl font-medium">Documentos</h1>
        <p className="text-white-50 text-base font-light pb-8 pt-3">
          Verifique os documentos enviados.
        </p>
        <div className="flex h-[90px] xl:h-[70px] border border-green-50 rounded-[10px] items-center px-2 xl:px-6 text-green-50 mb-6">
          <CgInfo size={24} />
          <div className="flex flex-col text-left pl-2 xl:pl-4">
            <p className="text-base font-medium">
              Estes documentos foram enviados durante o processo de cadastro na
              plataforma.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <ShowInformationCard
            label="Contrato Social*"
            checked={docs?.files[0]?.tags?.includes('approved')}
            information={docs?.files[0]?.name}
          />
          <ShowInformationCard
            label="Documento(frente)*"
            checked={docs?.files[1]?.tags?.includes('approved')}
            information={docs?.files[1]?.name}
          />
          <ShowInformationCard
            label="Documento(verso)*"
            checked={docs?.files[2]?.tags?.includes('approved')}
            information={docs?.files[2]?.name}
          />
          <ShowInformationCard
            label="Selfie*"
            checked={docs?.files[3]?.tags?.includes('approved')}
            information={docs?.files[3]?.name}
          />
          {!docsVerify && (
            <div className="flex w-full justify-end items-end mt-2">
              <div className="w-[342px] xl:w-[300px] text-white-50">
                <Button
                  onClick={handleRedirectToDocs}
                  variant="fifth"
                  h="40px"
                  size="100%"
                >
                  <MdOutlineUploadFile size={24} />
                  <span className="text-base font-bold">
                    Reenviar documentos
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex xl:w-[680px] justify-end items-end mt-8 mb-16">
        <div className="w-[398px] xl:w-[300px] text-white-50">
          <Button onClick={submit} type="button" h="40px" size="100%">
            <span className="text-base font-bold">
              {isLoading ? <Spinner /> : 'Salvar'}
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CompanyConfig;
