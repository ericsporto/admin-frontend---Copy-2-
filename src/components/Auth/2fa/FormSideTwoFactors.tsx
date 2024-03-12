'use client';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/Global/Button';
import OtpInput from 'react-otp-input';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Global/Spinner';
import { parseCookies } from 'nookies';
import useResponse from '@/hooks/useResponse';

function FormSideTwoFactors() {
  const { '@NEXTION_TOKEN': token } = parseCookies();
  const t = useTranslations('TwoFactors');
  const locale = useLocale();
  const router = useRouter();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendIsLoading, setResendIsLoading] = useState(false);
  const {showSuccess} = useResponse()
  const [error, setError] = useState({
    isError: false,
    message: '',
    isSuccess: false,
  });
  let val: string;

  const handleOnChange = (code: string) => {
    setValue(code);
    if (val !== code && error.isError) {
      setError((state) => ({ ...state, isError: false }));
    }
    if (code.length === 6 && !error.isError) {
      val = code;
      onSubmit(code as any);
    }
  };

  const onSubmit = useCallback(
    async (code: string) => {
      setIsLoading(true);

      await api
        .get('/admin/auth/otp/validate', {
          params: { token: code.toUpperCase() },
        })
        .then(() => {
          router.push(`/${locale}/`);
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 500) {
            const message = err?.response?.data?.error?.exception_message;
            setError((state) => ({
              ...state,
              isError: true,
              message,
            }));
            return;
          }
          const message = err.response?.message;
          setError((state) => ({ ...state, isError: true, message }));
        })
        .finally(() => setIsLoading(false));
    },
    [locale, router],
  );

  const resendOtp = async () => {
    setResendIsLoading(true);
    try {
      await api.get(`/admin/auth/otp/email/resend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccess('Token successfully resent!')
      setResendIsLoading(false);
    } catch {
      setResendIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-end lg:items-center justify-center text-gray-900">
      <form className="w-full flex flex-col justify-center items-center">
        <Image
          src="/images/login-mascote.svg"
          alt="mascote-image"
          width={250}
          height={250}
          className="-mb-11 z-10 lg:hidden"
        />
        <div className="flex flex-col justify-center items-center text-center space-y-3 py-8 rounded-t-[30px] w-full xl:w-[70%] border border-gray-50 lg:border-none px-2 lg:px-0 shadowCardLogin">
          <Image
            width={50}
            height={63}
            src="/images/logo-x.svg"
            alt="nextion-logo"
          />
          <h1 className="font-bold text-2xl py-4">
            {t('twoFactorsVerification')}
          </h1>
          <h4 className="font-medium text-xl pb-4 text-center">
            {t('sentEmail')}
          </h4>
          <div className="w-full">
            {isLoading ? (
              <Spinner />
            ) : (
              <OtpInput
                shouldAutoFocus
                value={value}
                onChange={handleOnChange}
                numInputs={6}
                inputStyle={`inputStyle ${error.isError && 'inputError'}`}
                containerStyle="containerOTP"
                renderInput={(props) => <input {...props} />}
              />
            )}
            <p className="font-medium text-gray-50 flex justify-start py-1 pl-10">
              {t('didntReceive')}
              <span onClick={resendOtp} className="font-medium text-green-100 pl-2 cursor-pointer hover:text-[#149E61] ease-in duration-200">
                {resendIsLoading ? <Spinner/> : t('resend')}
              </span>
            </p>
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:justify-around w-full pt-4 gap-8">
            <Link href={`/${locale}/auth/login`}>
              <Button size="225px" variant="tertiary" h="40px">
                <span className="text-base font-bold">{t('goBack')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormSideTwoFactors;
