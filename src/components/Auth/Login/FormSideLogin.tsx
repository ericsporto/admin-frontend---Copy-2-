'use client';
import { CustomInput } from '@/components/Global/CustomInput';
import Image from 'next/image';
import { HiOutlineMail } from 'react-icons/hi';
import { RiAdminFill } from 'react-icons/ri';
import { BiLockAlt } from 'react-icons/bi';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/Global/Button';
import Link from 'next/link';
import useUserLogin from '@/requests/mutates/authMutates/getLogin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/schemas/schemas';
import {
  CheckOtpModel,
  LoginCreadentials,
} from '@/interfaces/authInterfaces/auth';
import Spinner from '@/components/Global/Spinner';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import useUserStore from '@/stores/useAuthStore';
import { setCookie } from 'nookies';
import { useState } from 'react';

function FormSideLogin() {
  const t = useTranslations('Login');
  const locale = useLocale();
  const router = useRouter();
  const { setToken } = useUserStore();
  const { mutateAsync } = useUserLogin();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCreadentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCreadentials) => {
    setIsLoading(true);

    try {
      const response = await mutateAsync(data);

      response && setToken(response?.data.token);

      api.defaults.headers.common['Authorization'] =
        `Bearer ${response?.data?.token}`;

      response &&
        setCookie(null, '@NEXTION_TOKEN', response?.data.token, {
          maxAge: 60 * 60 * 1,
          path: `/`,
        });

      response &&
        (await api
          .get<CheckOtpModel>(`/admin/auth/otp/check`)
          .then((otpResponse) => {
            if (otpResponse.data.enabled) {
              setIsLoading(false);
              router.push(`/${locale}/auth/2fa`);
            } else {
              setIsLoading(false);
              router.push(`/${locale}/`);
            }
          })
          .catch((error: any) => {
            setIsLoading(false);
          }));
    } catch {
      setIsLoading(false);
    }
  };

  const handleRedirectToManager = () => {
    const currentLocation = window.location;
    const domain = currentLocation.hostname;
    if (domain === 'localhost') {
      window.open(`http://localhost:3001/${locale}` as string, '_blank');
    } else {
      window.open(
        `http://nextion-dev-manager.nextionpay.com.br/${locale}` as string,
        '_blank',
      );
    }
  };

  return (
    <div className="flex w-full items-end lg:items-center justify-center text-gray-900">
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          src="/images/login-mascote.svg"
          alt="mascote-image"
          width={250}
          height={250}
          className="-mb-11 z-10 lg:hidden"
        />
        <div className="flex flex-col justify-center items-center space-y-3 pt-8 pb-4 rounded-t-[30px] w-full xl:w-[57%] shadowCardLogin">
          <Image
            width={184}
            height={74}
            src="/images/logo-image.svg"
            alt="nextion-logo"
          />
          <h1 className="font-bold text-2xl">{t('hello')}</h1>
          <h4 className="font-medium text-xl pb-4">{t('accountAccess')}</h4>
          <div className="space-y-6 w-[75%] xl:w-full">
            <CustomInput
              type="email"
              icon={<HiOutlineMail className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourEmail')}
              register={register('email')}
              errorType={errors.email}
              messageError={errors.email?.message}
              h="40px"
            />
            <CustomInput
              type="password"
              icon={<BiLockAlt className="w-6 h-6" />}
              iconPosition="left"
              placeholder={t('yourPassword')}
              register={register('password')}
              errorType={errors.password}
              messageError={errors.password?.message}
              h="40px"
            />
          </div>
          <p className="font-medium text-gray-50 cursor-pointer hover:text-gray-500 ease-in duration-200 mt-1">
            <Link href={`/${locale}/auth/forgot`}>{t('forgotPassword')}</Link>
          </p>
          <Button size="300px" type="submit" h="40px">
            <span className="text-base font-bold">
              {isLoading ? <Spinner /> : t('login')}
            </span>
          </Button>
          <p className="font-medium text-gray-50 flex flex-col text-center md:flex-row mt-1">
            {t('noAccount')}
            <span className="font-medium text-green-100 pl-2 cursor-pointer hover:text-[#149E61] ease-in duration-200">
              <Link href={`/${locale}/auth/register`}>{t('register')}</Link>
            </span>
          </p>
        </div>
        <Button
          onClick={handleRedirectToManager}
          size="250px"
          h="40px"
          type="button"
          variant="tertiary"
        >
          <RiAdminFill className="h-6 w-6" />
          <span className="text-base font-medium">{t('likeManager')}</span>
        </Button>
      </form>
    </div>
  );
}

export default FormSideLogin;
