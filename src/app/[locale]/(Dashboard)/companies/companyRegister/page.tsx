'use client';
import AlmostThereModal from '@/components/Companies/AlmostThereModal';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import CustomSelect from '@/components/Global/CustomSelect';
import Link from 'next/link';
import useFetchCountriesDropdown from '@/requests/queries/globalQueries/getCountriesDropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CompaniesDropdownModel,
  RegisterCompaniesCreadentials,
} from '@/interfaces/companiesInterfaces/companies';
import { companyRegisterSchema } from '@/utils/schemas/schemas';
import useResponse from '@/hooks/useResponse';
import useCompanyRegister from '@/requests/mutates/companiesMutates/getCompanyRegister';
import Spinner from '@/components/Global/Spinner';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import SpanError from '@/components/Global/SpanError';
import { useQueryClient } from '@tanstack/react-query';
import useFetchOficialIdDropdown from '@/requests/queries/globalQueries/getOficialIdDropdown';
import { api } from '@/services/api';

function CompanyRegister() {
  const t = useTranslations('CompanyRegister');
  const locale = useLocale();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [countryId, setCountryId] = useState('');
  const [checkCnpj, setCheckCnpj] = useState(false);
  const { showSuccess } = useResponse();
  const { data: countries } = useFetchCountriesDropdown();
  const { mutateAsync } = useCompanyRegister();
  const queryClient = useQueryClient();
  const { data: officialId } = useFetchOficialIdDropdown(
    countryId,
    'legal_person',
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterCompaniesCreadentials>({
    resolver: yupResolver(companyRegisterSchema),
  });


  const onSubmit = async (data: RegisterCompaniesCreadentials) => {
    if (!cnpj) {
      setCheckCnpj(true);
      return;
    } else {
      setCheckCnpj(false);
    }
    setIsLoading(true);
    const payload = {
      ...data,
      country_id: countryId,
      official_id_number: cnpj,
    };
    try {
      const response = await mutateAsync(payload);
      if (response?.data) {
        const payload ={
          company_id: response.data.id
        }
        await api.post('/admin/companies/selected', payload)
        queryClient.invalidateQueries({ queryKey: ['companies-dropdown'] });
        showSuccess('Empresa cadastrada com sucesso!');
        setIsLoading(false);
        setOpenModal(true);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlmostThereModal open={openModal} setOpen={setOpenModal} />
      <main className="w-full xl:h-[700px] flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col text-center text-white-50 justify-center items-center lg:w-[700px]">
            <h1 className="text-2xl font-bold pb-2">{t('letsStart')}</h1>
            <p className="text-base font-medium pb-7 px-6 xl:px-0">
              {t('fillCompanyDetails')}
            </p>
            <div className="w-full space-y-8 text-left">
              <CustomSelect
                onChange={(e) => setCountryId(e.target.value)}
                h="40px"
                textColor="#AEAEAE"
              >
                <option value="">País</option>
                {countries?.map((item, index) => (
                  <option className="text-black" key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CustomSelect>
              <CustomInput
                type="text"
                placeholder={t('companyName')}
                whitePlaceholder={true}
                textColor="white"
                register={register('business_name')}
                errorType={errors.business_name}
                messageError={errors.business_name?.message}
                h="40px"
              />
              <CustomInput
                type="text"
                placeholder={t('fantasyName')}
                whitePlaceholder={true}
                textColor="white"
                register={register('trading_name')}
                errorType={errors.trading_name}
                messageError={errors.trading_name?.message}
                h="40px"
              />
              <div className="flex flex-col xl:flex-row gap-8 justify-between items-center">
                <div className="w-full">
                  <CustomSelect
                    register={register('official_id_type')}
                    errorType={errors.official_id_type}
                    messageError={errors.official_id_type?.message}
                    h="40px"
                    textColor="#AEAEAE"
                  >
                    <option value="">Tipo de documento</option>
                    <option value={officialId && officialId[0]?.id}>
                      {officialId && officialId[0]?.abbreviation}
                    </option>
                  </CustomSelect>
                </div>
                <div className="flex flex-col w-full">
                  <CustomInput
                    type="text"
                    placeholder="00.000.000/000-00"
                    maxLength={17}
                    whitePlaceholder={true}
                    textColor="white"
                    onChange={(e) => setCnpj(e.target.value)}
                    h="40px"
                    value={formatCnpjCpf(cnpj)}
                  />
                  {checkCnpj && (
                    <SpanError message="Document number is required" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 my-8 lg:mt-10">
              <Link href={`/${locale}/`}>
                <Button type="button" size="300px" variant="tertiary">
                  <span className="text-sm font-bold">{t('goBack')}</span>
                </Button>
              </Link>
              <Button type="submit" size="300px">
                <span className="text-sm font-bold text-white-50">
                  {isLoading ? <Spinner /> : t('advance')}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CompanyRegister;
