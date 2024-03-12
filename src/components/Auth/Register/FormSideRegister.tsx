'use client';
import { CustomInput } from '@/components/Global/CustomInput';
import Image from 'next/image';
import { HiOutlineMail } from 'react-icons/hi';
import { BiLockAlt, BiPhone } from 'react-icons/bi';
import { MdPersonOutline } from 'react-icons/md';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/Global/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterCreadentials } from '@/interfaces/authInterfaces/auth';
import { registerSchema } from '@/utils/schemas/schemas';
import useUserRegister from '@/requests/mutates/authMutates/getRegister';
import useResponse from '@/hooks/useResponse';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/components/Global/Spinner';
import { GrDocumentUser } from 'react-icons/gr';
import CustomSelect from '@/components/Global/CustomSelect';
import useFetchOficialIdDropdown from '@/requests/queries/globalQueries/getOficialIdDropdown';
import { OficialId } from '@/interfaces/oficialIdInterfaces/oficialId';
import { Country } from '@/interfaces/countryInterfaces/country';
import { useQueryClient } from '@tanstack/react-query';
import useFetchCountriesDropdown from '@/requests/queries/globalQueries/getCountriesDropdown';
import { formatTel } from '@/utils/hacks/formatTel';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';

function FormSideRegister() {
  const t = useTranslations('Register');
  const locale = useLocale();
  const router = useRouter();
  const { mutateAsync } = useUserRegister();
  const { showSuccess } = useResponse();
  const [currentCountry, setCurrentCountry] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { data: oficial_id } = useFetchOficialIdDropdown(currentCountry, 'natural_person')
  const { data: country } = useFetchCountriesDropdown()
  const queryClient = useQueryClient();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterCreadentials>({
    resolver: yupResolver(registerSchema),
  });

  const { phone, official_id_number } = watch()

  const onSubmit = async (data: RegisterCreadentials) => {
    setIsLoading(true);
    const payload = {
      ...data,
      phone: data.phone
        .split('')
        .filter((char) => /\d/.test(char))
        .join(''),
      official_id_number: data.official_id_number.split('')
        .filter((char) => /\d/.test(char))
        .join(''),
      locale: locale,
    };
    try {
      const response = await mutateAsync(payload);
      if (response?.data) {
        showSuccess('Cadastro efetuado com sucesso!');
        setIsLoading(false);
        setTimeout(() => {
          router.push(`/${locale}/auth/login`);
        }, 2000);
      }
    } catch {
      setIsLoading(false);
    }
  };

  const handleGetOfficialId = (value: string) => {
    setCurrentCountry(value)
    queryClient.invalidateQueries({ queryKey: ['oficialId-dropdown'] });
  }

  return (
    <div className="flex w-full items-end lg:items-center justify-center text-gray-900">
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center space-y-3 py-8 rounded-t-[30px] w-full xl:w-[60%] shadowCardLogin">
          <Image
            width={184}
            height={74}
            src="/images/logo-image.svg"
            alt="nextion-logo"
          />
          <h1 className="font-bold text-2xl">{t('createAccount')}</h1>
          <h4 className="font-medium text-xl pb-4">{t('yourData')}</h4>
          <div className="space-y-6 w-[75%] xl:w-full">
            <CustomInput
              type="text"
              icon={<MdPersonOutline className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourName')}
              register={register('name')}
              errorType={errors.name} 
              messageError={errors.name?.message}
              h='40px'
            />
            <CustomInput
              type="email"
              icon={<HiOutlineMail className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourEmail')}
              register={register('email')}
              errorType={errors.email}
              messageError={errors.email?.message}
              h='40px'
            />
            <CustomInput
              type="text"
              icon={<BiPhone className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourPhone')}
              register={register('phone')}
              maxLength={15}
              errorType={errors.phone}
              value={formatTel(phone)}
              messageError={errors.phone?.message}
              h='40px'
            />
            <CustomSelect
              onChange={(e) => handleGetOfficialId(e.target.value)}
                  textColor='#aeaeae'
                  h='40px'>
                  <option value=''>Selecione o país</option>
                  {country?.map((item: Country) => (
                    <option key={item.id} value={item.id}>{item.name}</option>

                  ))}
                </CustomSelect>
                <CustomSelect
                  register={register('official_id_type')}
                  errorType={errors.official_id_type}
                  messageError={errors.official_id_type?.message}
              textColor='#aeaeae'
              h='40px'>
              <option>Selecione o tipo de documento</option>
                  {oficial_id?.map((item: OficialId) => (
                    <option key={item.id} value={item.id}>{item.abbreviation}</option>

                  ))}
            </CustomSelect>
            <CustomInput
              type="text"
              icon={<GrDocumentUser className="w-6 h-6" />}
              iconPosition="left"
              placeholder="Seu documento"
              value={formatCnpjCpf(official_id_number)}
                  register={register('official_id_number')}
                  errorType={errors.official_id_number}
                  messageError={errors.official_id_number?.message}
              h='40px'
            />
            <CustomInput
              type="password"
              icon={<BiLockAlt className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourPassword')}
              register={register('password')}
              errorType={errors.password}
              messageError={errors.password?.message}
              h='40px'
            />
            <CustomInput
              type="password"
              icon={<BiLockAlt className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('confirmPassword')}
              register={register('confirmPassword')}
              errorType={errors.confirmPassword}
              messageError={errors.confirmPassword?.message}
              h='40px'
            />
          </div>
          <div className="flex items-center gap-1 lg:gap-4 w-full justify-center xl:py-4">
            <input type="checkbox" className="accent-green-50 h-4 w-4" />
            <p className="font-medium text-gray-50 flex text-center">
              {t('confirm')}
              <span className="font-medium text-green-100 pl-2 cursor-pointer hover:text-[#149E61] ease-in duration-200">
                <Link href={`#`}>{t('terms')}</Link>
              </span>
            </p>
          </div>

          <Button
                type="submit" size="300px" h='40px'>
                <span className="text-base font-bold">
                  {isLoading ? <Spinner /> : 'Cadastrar'}
                </span>
              </Button>


          <p className="font-medium text-gray-50 flex text-center">
            {t('haveAccount')}
            <span className="font-medium text-green-100 pl-2 cursor-pointer hover:text-[#149E61] ease-in duration-200">
              <Link href={`/${locale}/auth/login`}>{t('entry')}</Link>
            </span>
          </p>
          <p className="font-light text-gray-50 text-[15px] text-center">
            {t('disclaimer')}
          </p>
        </div>
          </form>
        </div>

  );
}

export default FormSideRegister;
