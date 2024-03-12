'use client';
import { useLocale, useTranslations } from 'next-intl';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import { Button } from '@/components/Global/Button';
import Image from 'next/image';
import { FaSearchLocation } from 'react-icons/fa';
import useFetchSaleById from '@/requests/queries/salesQueries/getSaleById';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import { statusTranslate } from '@/utils/hacks/statusTranslate';
import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import { useRouter } from 'next/navigation';
import InsertCodeDeliverModal from '@/components/Transactions/InsertCodeDeliverModal';
import { useState } from 'react';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import useResponse from '@/hooks/useResponse';
import Spinner from '@/components/Global/Spinner';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';

type PageProps = {
  params: {
    id: string;
  };
};

export default function TransactionDetails({ params: { id } }: PageProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const { data: company } = useFetchCompaniesDropdown();
  const [open, setOpen] = useState(false);
  const { data: sale } = useFetchSaleById(
    company && (company[0].id as string),
    id,
  );
  const deliverVerify =
    sale?.delivery_status === 'awaiting_shipment' ? true : false;
  const deliveredVerify = sale?.delivery_status === 'delivered' ? true : false;
  const shippedVerify = sale?.delivery_status === 'shipped' ? true : false;
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();

  const submit = async () => {
    setIsLoading(true);

    try {
      await api.post(
        `/admin/companies/${company && company[0]?.id}/sales/${sale?.id}/delivery/delivered`,
      );
      queryClient.invalidateQueries({ queryKey: ['sale-by-id'] });
      showSuccess('Registro de entrega realizada feito com sucesso!');
      setIsLoading(false);
      setOpen(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <InsertCodeDeliverModal
        setOpen={setOpen}
        open={open}
        company_uuid={company && company[0].id}
        sale_uuid={sale?.id}
        tracking_code={sale?.tracking_code}
      />
      <main className="w-full flex flex-col justify-between items-start xl:px-2 py-3 gap-7">
        <div className="flex flex-col xl:flex-row justify-between items-center w-full">
          <h1 className="text-green-50 text-2xl font-bold my-4 xl:my-0">
            Detalhes da Transação
          </h1>
          <div className="flex flex-col xl:flex-row gap-4">
            {shippedVerify && (
              <div className="w-[402px] xl:w-[300px]">
                <Button onClick={submit} variant="primary" size="100%" h="40px">
                  {' '}
                  <span className="text-base font-medium">
                    {isLoading ? <Spinner /> : 'Entrega efetuada'}
                  </span>
                </Button>
              </div>
            )}
            {!deliveredVerify && (
              <div className="w-[402px] xl:w-[300px]">
                <Button
                  onClick={() => setOpen(true)}
                  variant={deliverVerify ? 'primary' : 'seventh'}
                  size="100%"
                  h="40px"
                >
                  {' '}
                  <FaSearchLocation className="w-6 h-6" />
                  <span className="text-base font-medium">
                    {deliverVerify
                      ? 'Cadastrar código de envio'
                      : 'Consultar código de envio'}
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-between w-full gap-6">
          <aside className="w-full xl:w-[70%] flex flex-col">
            <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between p-8">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-green-50 text-base font-medium">
                    Valor da venda
                  </h2>
                  <h1 className=" text-white-50 text-2xl font-bold">
                    {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(
                      sale?.total_price_with_shipping.toString(),
                      locale,
                    )}
                  </h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-gray-50 text-sm font-medium">Status</h3>
                  <div className="mt-1 xl:mt-0">
                    {(sale?.status === 'payment_received' ||
                      sale?.status === 'completed') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )}
                    {(sale?.status === 'awaiting_payment' ||
                      sale?.status === 'open_dispute') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-yellow-100 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )}
                    {(sale?.status === 'cancelled' ||
                      sale?.status === 'expired') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mt-8">
                <div className="flex flex-col items-start w-36 break-all">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    ID Transação
                  </p>
                  <h1 className="text-white-50 text-base font-medium">
                    {sale?.payment.sale_id}
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    Gateway ID
                  </p>
                  <h1 className="text-white-50 text-base font-medium">
                    0000-000000-00000
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    Data de criação
                  </p>
                  <h1 className="text-white-50 text-base font-medium">
                    {editDateWithHours(sale?.created_at)}
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    Data do pagamento
                  </p>
                  <h1 className="text-white-50 text-base font-medium">
                    {editDateWithHours(sale?.payment.paid_at)}
                  </h1>
                </div>
              </div>
              <div className="flex w-full justify-center xl:justify-end mt-8 xl:mb-2">
                <div className="w-[342px] xl:w-[300px]">
                  <Button variant="fifth" size="100%" h="40px">
                    {' '}
                    <RiMoneyDollarCircleLine size={24} />
                    <span className="text-base font-bold">Estornar</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between mt-8 p-8">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-white-50 text-base font-medium">
                    Cliente
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex justify-center items-center bg-green-50 text-white-50 rounded-[10px] text-[15px] font-bold w-[35px] h-[35px]">
                      {sale?.customer.name && handleName(sale?.customer.name)}
                    </div>
                    <div>
                      <h1 className=" text-white-50 text-[15px] font-medium">
                        {sale?.customer.name}
                      </h1>
                      <p className=" text-gray-50 text-xs font-light">
                        {sale?.customer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-start gap-6 xl:gap-12 mt-8">
                <div className="flex flex-col items-start">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    CPF/CNPJ
                  </p>
                  <h1 className="text-white-50 text-[15px] font-medium">
                    {formatCnpjCpf(sale?.customer.official_id_number)}
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <p className="flex items-end text-gray-50 text-sm font-medium">
                    Telefone
                  </p>
                  <h1 className="text-white-50 text-[15px] font-medium">
                    {sale?.customer.primary_phone}
                  </h1>
                </div>
              </div>
              <div className="flex w-full justify-end mt-8 xl:mb-2">
                <div className="w-[342px] xl:w-[300px]">
                  <Button
                    onClick={() =>
                      router.push(`/${locale}/customers/${sale?.customer.id}`)
                    }
                    variant="fifth"
                    size="100%"
                    h="40px"
                  >
                    {' '}
                    <MdPerson className="w-6 h-6" />
                    <span className="text-base font-bold">Ver cliente</span>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
          <aside className="w-full xl:w-[30%]">
            <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between p-8">
              <h1 className="text-white-50 text-base font-medium">Carrinho</h1>
              <div className="mt-4 flex items-center justify-start gap-4">
                <div className="bg-gray-50 w-[60px] xl:w-[65px] h-[60px] xl:h-[65px] rounded-[10px]"></div>
                <div className="w-[70%]">
                  <p className="text-gray-50 text-sm font-medium">
                    {sale?.products[0]?.name}
                  </p>
                  <p className="text-gray-50 text-sm font-medium">
                    {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(
                      sale?.products[0]?.pivot.price.toString(),
                      locale,
                    )}
                  </p>
                  <p className="text-gray-50 text-sm font-medium">
                    Qtd.: {sale?.products[0]?.pivot.amount}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
              <h1 className="text-white-50 text-base font-medium">
                Meio de pagamento
              </h1>
              <div className="flex justify-start items-center mt-6 gap-3">
                <Image
                  src="/images/master-icon.svg"
                  alt="icon"
                  width={35}
                  height={35}
                  className="rounded-[10px]"
                />
                <h1 className="text-green-50 text-xl font-medium">Crédito</h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Data da transação
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  14 de dezembro
                </h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Parcelas
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  2x de 2.000,00
                </h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Primeiros dígitos
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  000000
                </h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Últimos dígitos
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">0000</h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Data de expiração
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  14/2028
                </h1>
              </div>
              <div className="flex flex-col items-start mt-6">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Proprietário
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  EX Enterprise
                </h1>
              </div>
            </div>
            <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
              <h1 className="text-white-50 text-sm font-medium">Taxas</h1>
              <div className="mt-4 flex flex-col items-start gap-2">
                <div className="flex justify-between items-center w-full">
                  <p className="flex items-end text-gray-50 text-xs font-medium">
                    Valor Bruto
                  </p>
                  <p className="flex items-end text-gray-50 text-xs font-medium">
                    R$4.000,00
                  </p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="flex items-end text-gray-50 text-xs font-medium">
                    Taxa Intermediação
                  </p>
                  <p className="flex items-end text-gray-50 text-xs font-medium">
                    R$100,00
                  </p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <h1 className="flex items-end text-white-50 text-[15px] font-medium">
                    Valor líquido
                  </h1>
                  <div className="flex items-center">
                    <p className="flex items-end text-white-50 text-[10px] font-medium mt-1 xl:mt-0">
                      aprox.
                    </p>
                    <h1 className="flex items-end text-green-50 text-[15px] font-medium">
                      R$3.900,00
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
