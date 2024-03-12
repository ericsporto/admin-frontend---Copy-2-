'use client';
import { CustomInput } from '@/components/Global/CustomInput';
import Image from 'next/image';
import { HiOutlineMail } from 'react-icons/hi';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/Global/Button';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ForgotCreadentials } from '@/interfaces/authInterfaces/auth';
import { forgotSchema } from '@/utils/schemas/schemas';
import useUserForgot from '@/requests/mutates/authMutates/getForgot';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useResponse from '@/hooks/useResponse';
import Spinner from '@/components/Global/Spinner';

function FormSideForgot() {
  const t = useTranslations('Forgot');
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotCreadentials>({
    resolver: yupResolver(forgotSchema),
  });

  const { mutateAsync } = useUserForgot();

  const onSubmit = async (data: ForgotCreadentials) => {
    setIsLoading(true);

    await mutateAsync(data);
    setIsLoading(false);
    showSuccess('Link enviado! Por favor, verifique seu e-mail.');
  };

  return (
    <div className="flex w-full items-end lg:items-center justify-center text-gray-900">
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center space-y-3 py-8 rounded-t-[30px] w-full xl:w-[75%] border border-gray-50 lg:border-none px-2 lg:px-0">
          <Image
            width={50}
            height={63}
            src="/images/logo-x.svg"
            alt="nextion-logo"
          />
          <h1 className="font-bold text-2xl py-4">{t('recoverPassword')}</h1>
          <h4 className="font-medium text-xl pb-4 text-center">
            {t('toRecover')}
          </h4>
          <div className="space-y-6 w-full">
            <CustomInput
              type="email"
              icon={<HiOutlineMail className="w-6 h-6" />}
              iconPosition="left"
              register={register('email')}
              placeholder={t('yourEmail')}
              errorType={errors.email}
              messageError={errors.email?.message}
              h="40px"
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:justify-around w-full pt-4 gap-8">
            <Link href={`/${locale}/auth/login`}>
              <Button size="235px" variant="tertiary" h="40px">
                <span className="text-base font-bold">
                  {t('goBack')}
                </span>
              </Button>
            </Link>
            <Button type="submit" size="235px" h="40px">
              <span className="text-base font-bold">
                {isLoading ? <Spinner /> : t('recoverPassword')}
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormSideForgot;
