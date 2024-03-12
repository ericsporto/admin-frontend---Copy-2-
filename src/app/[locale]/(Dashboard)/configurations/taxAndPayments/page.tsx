'use client';

import TaxDropdown from '@/components/TaxAndPayments/TaxDropdown';
import useFetchCompanyTax from '@/requests/queries/companiesQueries/getCompanyTax';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import useUserStore from '@/stores/useAuthStore';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { FaCreditCard } from 'react-icons/fa';
import { MdOutlinePix } from 'react-icons/md';
import { RiBarcodeBoxLine } from 'react-icons/ri';

function TaxAndPayments() {
  const locale = useLocale();
  const {user} = useUserStore()
  const { data: company } = useFetchCompaniesDropdown();
  const { data: tax } = useFetchCompanyTax(user?.user.has_company && company ?
    company[0].id as string : '');
  return (
    <main className="w-full h-full flex flex-col justify-center items-center rounded-[20px] bg-gray-200 overflow-hidden">
      <div className="flex justify-between w-full">
        <div className="w-full xl:w-[370px] flex justify-center items-center">
          <div className="w-[300px] xl:w-[250px] space-y-3">
            <h1 className="text-[40px] font-bold text-green-50 leading-[48px] mt-14 xl:mt-2">
              Taxas de Pagamentos
            </h1>
            <p className="text-base font-light text-white-50 leading-[19px]">
              Venda mais com a melhor plataforma de pagamentos
            </p>
            <div className="w-full flex justify-center pl-4">
              <Image
                src="/images/tax-logo.svg"
                alt="tax-logo"
                width={124}
                height={50}
              />
            </div>
          </div>
        </div>
        <div
          className="hidden xl:flex w-[713px] h-[291px] -mr-1"
          style={{
            backgroundImage: `url(/images/tax-image.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
      </div>
      <div className="flex flex-col justify-start items-start w-full px-8 pb-8">
        <div>
          <h1 className="text-2xl font-bold text-green-50 my-8">
            Meios de pagamento
          </h1>
        </div>
        <div className="flex flex-col xl:flex-row justify-between w-full space-y-4 xl:space-y-0">
          <div className="flex flex-col border text-green-50 border-green-50 rounded-[20px] p-4 justify-center items-center space-y-2 xl:w-[316px]">
            <RiBarcodeBoxLine size={50} />
            <p className="text-xl font-bold">Boletos</p>
            <p className="text-base font-light text-white-50 px-3">
              Não há cobrança pelos boletos emitidos, somente pelos boletos
              efetivamente pagos. Se não realizar vendas, não há custos!
            </p>
            <div className="flex flex-col justify-start items-start w-full px-3">
              <p className="text-sm font-light text-gray-50">por boleto</p>
              <p className="text-xl font-bold">
                {formatCurrency(tax?.bank_slip_fixed_fee, locale)}% +{' '}
                {locale === 'en' ? '$' : 'R$'}
                {formatCurrency(tax?.bank_slip_variable_fee, locale)}
              </p>
            </div>
          </div>
          <div className="flex flex-col border text-green-50 border-green-50 rounded-[20px] p-4 justify-center items-center space-y-2 xl:w-[316px]">
            <FaCreditCard size={50} />
            <p className="text-xl font-bold">Cartão de crédito</p>
            <TaxDropdown installments={tax?.credit_card_installment_fees} />
            <div className="flex flex-col justify-start items-start w-full px-3">
              <p className="text-sm font-light text-gray-50">por transação</p>
              <p className="text-xl font-bold">
                {formatCurrency(tax?.credit_card_fixed_fee, locale)}%
                + {locale === 'en' ? '$' : 'R$'}
                {formatCurrency(tax?.credit_card_variable_fee, locale)}
              </p>
            </div>
          </div>
          <div className="flex flex-col border text-green-50 border-green-50 rounded-[20px] p-4 justify-center items-center space-y-2 xl:w-[316px]">
            <MdOutlinePix size={50} />
            <p className="text-xl font-bold">PIX</p>
            <p className="text-base font-light text-white-50 px-3">
              PIX é o meio de pagamento instantâneo da plataforma.
            </p>
            <div className="flex flex-col justify-start items-start w-full px-3">
              <p className="text-sm font-light text-gray-50">por pix</p>
              <p className="text-xl font-bold">
                {formatCurrency(tax?.pix_fixed_fee, locale)}% +{' '}
                {locale === 'en' ? '$' : 'R$'}
                {formatCurrency(tax?.pix_variable_fee, locale)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TaxAndPayments;
