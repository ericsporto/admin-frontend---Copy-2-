'use client';
import { Button } from '@/components/Global/Button';
import React, { useEffect, useState } from 'react';
import { IoDocumentsOutline } from 'react-icons/io5';
import { CustomInput } from '@/components/Global/CustomInput';
import useFetchCompanyDocs from '@/requests/queries/companiesQueries/getCompanyDocs';
import { api } from '@/services/api';
import Spinner from '@/components/Global/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import useResponse from '@/hooks/useResponse';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import useUserStore from '@/stores/useAuthStore';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';

const UploadDocuments: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();
  const {user} = useUserStore()
  const queryClient = useQueryClient();
  const { data: company } = useFetchCompaniesDropdown();
  const { data: docs } = useFetchCompanyDocs(user?.user.has_company && company ?
    company[0].id as string : '');
  const [readyIsLoading, setReadyIsLoading] = useState(false);
  const { showSuccess } = useResponse();

  const sentSocialContractFile = docs?.files.find((item) =>
    item.tags.includes('articles_of_association')
  );
  const sentDocumentFrontFile = docs?.files.find((item) =>
    item.tags.includes('owner_official_id_front')
  );
  const sentDocumentVerseFile = docs?.files.find((item) =>
    item.tags.includes('owner_official_id_back')
  );
  const sentSelfieFile = docs?.files.find((item) =>
    item.tags.includes('owner_selfie')
  );

  const [socialContractFile, setSocialContractFile] = useState<
    File | Blob | null
  >(null);
  const [documentFrontFile, setDocumentFrontFile] = useState<
    File | Blob | null
  >();
  const [documentVerseFile, setDocumentVerseFile] = useState<
    File | Blob | null
  >();
  const [selfieFile, setSelfieFile] = useState<File | Blob | null>();
  const [socialContractFileName, setSocialContractFileName] =
    useState<string>('');
  const [documentFrontFileName, setDocumentFrontFileName] =
    useState<string>('');
  const [documentVerseFileName, setDocumentVerseFileName] =
    useState<string>('');
  const [selfieFileName, setSelfieFileName] = useState<string>('');
  const [socialContractIsLoading, setSocialContractIsLoading] = useState(false);
  const [documentFrontIsLoading, setDocumentFrontIsLoading] = useState(false);
  const [documentVerseIsLoading, setDocumentVerseIsLoading] = useState(false);
  const [selfieIsLoading, setSelfieIsLoading] = useState(false);

  useEffect(() => {
    if (!socialContractFileName) {
      setSocialContractFile(null);
    }
    if (!documentFrontFileName) {
      setDocumentFrontFile(null);
    }
    if (!documentVerseFileName) {
      setDocumentVerseFile(null);
    }
    if (!selfieFileName) {
      setSelfieFile(null);
    }
  }, [
    socialContractFileName,
    documentFrontFileName,
    documentVerseFileName,
    selfieFileName,
  ]);

  useEffect(() => {
    if (sentSocialContractFile) {
      setSocialContractFileName(sentSocialContractFile.name);
    }
    if (sentDocumentFrontFile) {
      setDocumentFrontFileName(sentDocumentFrontFile.name);
    }
    if (sentDocumentVerseFile) {
      setDocumentVerseFileName(sentDocumentVerseFile.name);
    }
    if (sentSelfieFile) {
      setSelfieFileName(sentSelfieFile.name);
    }
  }, [
    sentSocialContractFile,
    sentDocumentFrontFile,
    sentDocumentVerseFile,
    sentSelfieFile,
  ]);

  const handleSocialContractFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setSocialContractFileName(fileInput.files[0].name);
      setSocialContractFile(fileInput.files[0]);
    } else {
      setSocialContractFileName('');
      setSocialContractFile(null);
    }
  };

  const handleDocumentFrontFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setDocumentFrontFileName(fileInput.files[0].name);
      setDocumentFrontFile(fileInput.files[0]);
    } else {
      setDocumentFrontFileName('');
      setDocumentFrontFile(null);
    }
  };

  const handleDocumentVerseFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setDocumentVerseFileName(fileInput.files[0].name);
      setDocumentVerseFile(fileInput.files[0]);
    } else {
      setDocumentVerseFileName('');
      setDocumentVerseFile(null);
    }
  };

  const handleSelfieFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setSelfieFileName(fileInput.files[0].name);
      setSelfieFile(fileInput.files[0]);
    } else {
      setSelfieFileName('');
      setSelfieFile(null);
    }
  };

  const handleSendSocialContract = async () => {
    setSocialContractIsLoading(true);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const formData = new FormData();
    if (socialContractFile) {
      formData.append('file', socialContractFile);
      formData.append('tag', 'articles_of_association');
    }
    try {
      await api.post(
        `/admin/companies/${company}/kyb/files`,
        formData,
        config
      );
      queryClient.invalidateQueries({ queryKey: ['company-docs'] });
      showSuccess('Documento enviado com sucesso!');
      setSocialContractIsLoading(false);
    } catch (error) {
      setSocialContractIsLoading(false);
    }
  };
  const handleSendDocumentFront = async () => {
    setDocumentFrontIsLoading(true);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const formData = new FormData();
    if (documentFrontFile) {
      formData.append('file', documentFrontFile);
      formData.append('tag', 'owner_official_id_front');
    }
    try {
      await api.post(
        `/admin/companies/${company}/kyb/files`,
        formData,
        config
      );
      queryClient.invalidateQueries({ queryKey: ['company-docs'] });
      showSuccess('Documento enviado com sucesso!');
      setDocumentFrontIsLoading(false);
    } catch (error) {
      setDocumentFrontIsLoading(false);
    }
  };
  const handleSendDocumentVerse = async () => {
    setDocumentVerseIsLoading(true);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const formData = new FormData();
    if (documentVerseFile) {
      formData.append('file', documentVerseFile);
      formData.append('tag', 'owner_official_id_back');
    }
    try {
      await api.post(
        `/admin/companies/${company}/kyb/files`,
        formData,
        config
      );
      queryClient.invalidateQueries({ queryKey: ['company-docs'] });
      showSuccess('Documento enviado com sucesso!');
      setDocumentVerseIsLoading(false);
    } catch (error) {
      setDocumentVerseIsLoading(false);
    }
  };
  const handleSendSelfie = async () => {
    setSelfieIsLoading(true);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const formData = new FormData();
    if (selfieFile) {
      formData.append('file', selfieFile);
      formData.append('tag', 'owner_selfie');
    }
    try {
      await api.post(
        `/admin/companies/${company}/kyb/files`,
        formData,
        config
      );
      queryClient.invalidateQueries({ queryKey: ['company-docs'] });
      showSuccess('Documento enviado com sucesso!');
      setSelfieIsLoading(false);
    } catch (error) {
      setSelfieIsLoading(false);
    }
  };

  const handleReadyForReview = async () => {
    setReadyIsLoading(true);
    try {
      await api.post(`/admin/companies/${company}/kyb/ready`);
      showSuccess('Documentação enviada para avaliação com sucesso!');
      setReadyIsLoading(false);
      setTimeout(() => {
        router.push(`/${locale}/`);
      }, 1500);
    } catch {
      setReadyIsLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-center">
      <div className="flex items-center border border-green-50 py-4 px-12 mt-5 rounded-[10px] xl:w-[700px] text-center">
        <p className="text-base font-medium text-white-50">
          Sua solicitação para usar a plataforma está pendente. Você receberá um
          e-mail quando o status da solicitação for atualizado.
        </p>
      </div>
      <div className="flex flex-col text-center text-white-50 justify-center items-center lg:w-[700px] mt-6">
        <div className="flex items-center gap-4">
          <IoDocumentsOutline size={24} />
          <h1 className="text-xl font-bold">Upload de Documentos</h1>
        </div>
        <p className="text-sm xl:text-base font-light pb-8">
          Realize o upload dos seus documentos para começar utilizar a
          plataforma. Documentos incompletos podem fazer com que a sua
          solicitação seja recusada.
        </p>
        <div className="w-full space-y-4 text-left">
          <div className="flex items-end justify-center gap-2">
            <CustomInput
              label="Contrato Social*"
              type="file"
              iconPosition="right"
              h="40px"
              selectedFileName={socialContractFileName}
              setSelectedFileName={setSocialContractFileName}
              onChange={handleSocialContractFileChange}
            />
            <Button
              disabled={socialContractFile ? false : true}
              onClick={handleSendSocialContract}
              type="button"
              size="90px"
            >
              <span className="text-base font-medium text-white-50">
                {socialContractIsLoading ? <Spinner /> : 'Enviar'}
              </span>
            </Button>
          </div>
          <div className="flex items-end justify-center gap-2">
            <CustomInput
              label="Frente do documento de um dos sócios*"
              type="file"
              id="contract"
              iconPosition="right"
              h="40px"
              selectedFileName={documentFrontFileName}
              setSelectedFileName={setDocumentFrontFileName}
              onChange={handleDocumentFrontFileChange}
            />
            <Button
              disabled={documentFrontFile ? false : true}
              onClick={handleSendDocumentFront}
              type="button"
              size="90px"
            >
              <span className="text-base font-medium text-white-50">
                {documentFrontIsLoading ? <Spinner /> : 'Enviar'}
              </span>
            </Button>
          </div>
          <div className="flex items-end justify-center gap-2">
            <CustomInput
              label="Verso do documento de um dos sócios*"
              type="file"
              iconPosition="right"
              h="40px"
              selectedFileName={documentVerseFileName}
              setSelectedFileName={setDocumentVerseFileName}
              onChange={handleDocumentVerseFileChange}
            />
            <Button
              disabled={documentVerseFile ? false : true}
              onClick={handleSendDocumentVerse}
              type="button"
              size="90px"
            >
              <span className="text-base font-medium text-white-50">
                {documentVerseIsLoading ? <Spinner /> : 'Enviar'}
              </span>
            </Button>
          </div>
          <div className="flex items-end justify-center gap-2">
            <CustomInput
              label="Selfie segurando seu documento*"
              type="file"
              iconPosition="right"
              h="40px"
              selectedFileName={selfieFileName}
              setSelectedFileName={setSelfieFileName}
              onChange={handleSelfieFileChange}
            />
            <Button
              disabled={selfieFile ? false : true}
              onClick={handleSendSelfie}
              type="button"
              size="90px"
            >
              <span className="text-base font-medium text-white-50">
                {selfieIsLoading ? <Spinner /> : 'Enviar'}
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6 my-6">
          <Button onClick={handleReadyForReview} type="button" size="300px">
            <span className="text-base font-bold text-white-50">
              {readyIsLoading ? <Spinner /> : 'Salvar'}
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UploadDocuments;
