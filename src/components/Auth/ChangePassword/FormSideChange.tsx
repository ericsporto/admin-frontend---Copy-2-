'use client';
import { CustomInput } from '@/components/Global/CustomInput';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/Global/Button';
import Link from 'next/link';
import { BiLockAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordCreadentials } from '@/interfaces/authInterfaces/auth';
import { changePasswordSchema } from '@/utils/schemas/schemas';
import useUserResetPassword from '@/requests/mutates/authMutates/getReset';
import { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { api } from '@/services/api';
import useResponse from '@/hooks/useResponse';
import Spinner from '@/components/Global/Spinner';
import { useRouter } from 'next/navigation';

function FormSideChange() {
  const [credentials, setCredentials] = useState({ token: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [resendIsLoading, setResendIsLoading] = useState(false);
  const t = useTranslations('ChangePassword');
  const locale = useLocale();
  const router = useRouter();
  const { showSuccess } = useResponse();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (token && email) {
      setCredentials({
        email: email,
        token: token,
      });
    } else {
      console.error('Token ou email ausentes na URL');
    }
  }, []);

  const { mutateAsync } = useUserResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordCreadentials>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordCreadentials) => {
    setIsLoading(true);
    const payload = {
      token: credentials.token,
      email: credentials.email,
      password: data.password,
    };
    try {
      const response = await mutateAsync(payload);
      if (response?.data) {
        showSuccess('Password modificado com sucesso!');
        setIsLoading(false);
        setTimeout(() => {
          router.push(`/${locale}/auth/login`);
        }, 2000);
      }
    } catch {
      setIsLoading(false);
    }
  };

  const resendEmail = async () => {
    setResendIsLoading(true);
    const payload = {
      email: credentials.email,
    };
    try {
      await api.post(`/admin/auth/forgot`, payload);
      showSuccess('E-mail reenviado com sucesso!');
      setResendIsLoading(false);
    } catch {
      setResendIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-end lg:items-center justify-center text-gray-900">
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center space-y-3 py-8 rounded-t-[30px] w-full xl:w-[70%] border border-gray-50 lg:border-none px-2 lg:px-0">
          <Image
            width={50}
            height={63}
            src="/images/logo-x.svg"
            alt="nextion-logo"
          />
          <h1 className="font-bold text-2xl py-4">{t('changePassword')}</h1>
          <h4 className="font-medium text-xl pb-4 text-center">
            {t('typeIt')}
          </h4>
          <div className="w-full">
            <CustomInput
              disabled
              type="text"
              icon={<HiOutlineMail className="w-6 h-6" />}
              iconPosition="left"
              placeholder={credentials.email}
              h="40px"
            />
            <div className="w-full space-y-8 pt-8">
              <CustomInput
                type="password"
                icon={<BiLockAlt className="w-6 h-6" />}
                iconPosition="left"
                placeholder={t('newPassword')}
                register={register('password')}
                errorType={errors.password}
                messageError={errors.password?.message}
                h="40px"
              />
              <CustomInput
                type="password"
                icon={<BiLockAlt className="w-6 h-6" />}
                iconPosition="left"
                placeholder={t('confirmPassword')}
                register={register('confirmPassword')}
                errorType={errors.confirmPassword}
                messageError={errors.confirmPassword?.message}
                h="40px"
              />
            </div>
            {/* <p className="font-medium text-gray-50 flex flex-col text-center md:flex-row py-1">
              {t('didntReceive')}
              <span
                onClick={resendEmail}
                className="font-medium text-green-100 pl-2 cursor-pointer hover:text-[#149E61] ease-in duration-200"
              >
                {resendIsLoading ? <Spinner /> : t('resend')}
              </span>
            </p> */}
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:justify-around w-full pt-4 gap-8">
            <Link href={`/${locale}/auth/forgot`}>
              <Button size="225px" variant="tertiary" h="40px">
                <span className="text-base font-bold">
                  {t('goBack')}
                </span>
              </Button>
            </Link>
            <Button size="225px" h="40px">
              <span className="text-base font-bold">
                {isLoading ? <Spinner /> : t('send')}
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormSideChange;
