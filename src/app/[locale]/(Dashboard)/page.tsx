'use client';
import { useLocale, useTranslations } from 'next-intl';
import { TiArrowSortedUp } from 'react-icons/ti';
import { RiCalendar2Line } from 'react-icons/ri';
import { BiAddToQueue, BiBarcode } from 'react-icons/bi';
import { IoCardOutline } from 'react-icons/io5';
import { MdOutlinePix } from 'react-icons/md';
import CircularProgressBar from '@/components/Global/CircularProgressBar';
import LineChart from '@/components/Dashboard/LineChart';
import { useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import useFetchCurrent from '@/requests/queries/authQueries/getCurrent';
import useUserStore from '@/stores/useAuthStore';
import { parseCookies } from 'nookies';
import ModalKyc from '@/components/Dashboard/ModalKyc';
import { Button } from '@/components/Global/Button';
import { useRouter } from 'next/navigation';
import useFetchDashboardSales from '@/requests/queries/dashboardQueries/getDashboardSales';
import { inputDate } from '@/utils/hacks/editDate';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import useFetchDashboardSalesByMethod from '@/requests/queries/dashboardQueries/getDashboardSalesByMethod';
import useFetchDashboardCardDetails from '@/requests/queries/dashboardQueries/getDashboardSalesCardDetails';
import useFetchDashboardRates from '@/requests/queries/dashboardQueries/getDashboardRates';
import useFetchDashboardTracking from '@/requests/queries/dashboardQueries/getDashboardTracking';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';

registerLocale('pt-BR', ptBR);

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const { '@NEXTION_TOKEN': token } = parseCookies();
  const { setUser } = useUserStore();
  const { data: companies } = useFetchCompaniesDropdown();
  const { data: user } = useFetchCurrent(token as string); 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { data: dash } = useFetchDashboardSales(
    user?.data?.user.has_company && companies ? (companies[0].id as string) : '',
    inputDate(startDate),
    inputDate(endDate),
  );
  const { data: byMethod } = useFetchDashboardSalesByMethod(
    user?.data?.user.has_company && companies ? (companies[0].id as string) : '',
    inputDate(startDate),
    inputDate(endDate),
  );
  const { data: cardDetails } = useFetchDashboardCardDetails(
    user?.data?.user.has_company && companies ? (companies[0].id as string) : '',
    inputDate(startDate),
    inputDate(endDate),
  );
  const { data: rates } = useFetchDashboardRates(
    user?.data?.user.has_company && companies ? (companies[0].id as string) : '',
    inputDate(startDate),
    inputDate(endDate),
  );
  const { data: tracking } = useFetchDashboardTracking(
    user?.data?.user.has_company && companies ? (companies[0].id as string) : '',
    inputDate(startDate),
    inputDate(endDate),
  );

  const data = dash?.graph.map((item) => item.value);
  const labels = dash?.graph.map((item) => item.date);

  useEffect(() => {
    if (user?.data) {
      setUser(user?.data);
    }
  }, [setUser, user?.data]);

  const handleStartDateChange = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };
  const handleEndDateChange = (date: Date | null) => {
    if (date !== null) {
      setEndDate(date);
    }
  };

  return (
    <>
      <main className="w-full flex flex-col xl:flex-row justify-between items-start px-2 py-3 gap-7">
        <ModalKyc open={isOpen} setOpen={setIsOpen} />
        {user?.data?.user.kyc_status === 'not_started' && (
          <div className="w-full p-4 bg-red-100 rounded-[10px] flex flex-col items-center justify-center text-center">
            <p className="text-white-100 font-medium text-center">
              Por favor, envie os documentos necessários para validar sua conta
              e continuar o processo
            </p>
            <span
              onClick={() => setIsOpen(true)}
              className="text-white-100 font-bold cursor-pointer underline "
            >
              Clique aqui para enviar seus documentos
            </span>
          </div>
        )}
        {user?.data?.user.kyc_status === 'under_review' ||
          (user?.data?.user.kyc_status === 'pending_review' && (
            <div className="w-full p-4  border border-yellow-100 rounded-[10px] flex flex-col items-center justify-center">
              <p className="text-yellow-100 font-medium text-center ">
                Bem vindo! Seus documentos estão em análise. Após a aprovação,
                você poderá iniciar a criação da sua empresa.
              </p>
            </div>
          ))}
        {user?.data?.user.kyc_status === 'rejected' && (
          <div className="w-full p-4 bg-red-100 rounded-[10px] flex flex-col items-center justify-center">
            <p className="text-white-100 font-medium text-center">
              Ops! Seus documentos foram reprovados. Não se preocupe, você pode
              corrigi-los facilmente.{' '}
            </p>
            <span
              onClick={() => setIsOpen(true)}
              className="text-white-100 font-bold cursor-pointer underline text-center"
            >
              Clique aqui para reenviá-los e continuar com o processo.
            </span>
          </div>
        )}
        {user?.data?.user.has_company && (
          <>
            <aside className="w-full xl:w-[70%] flex flex-col">
              <div className="flex flex-col xl:flex-row justify-between items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-green-50 text-2xl font-bold">
                    Dashboard
                  </h1>
                  <p className="text-white-50 text-base font-light">
                    Atualizações a todo instante.
                  </p>
                </div>
                <div className="flex items-center border border-gray-50 rounded-[10px] px-2 py-1 mt-4 xl:mt-0">
                  <RiCalendar2Line className="w-6 h-6 text-gray-50 mr-10" />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleStartDateChange(date)}
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    className="bg-transparent w-[90px] text-base text-white-50 font-medium cursor-pointer outline-none"
                  />
                  <p className="text-base text-white-50 font-medium px-2">-</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => handleEndDateChange(date)}
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    className="bg-transparent w-24 text-base text-white-50 font-medium cursor-pointer outline-none"
                  />
                </div>
              </div>
              <div className="rounded-[20px] bg-gray-200 flex flex-col xl:flex-row xl:justify-between items-center mt-8 p-8 gap-10 xl:gap-0">
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Total em vendas
                  </h1>
                  <p className="flex items-end text-white-50 text-xl font-bold">
                    {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(dash?.total_value.toString(), locale)}{' '}
                    <TiArrowSortedUp className=" text-green-50" />
                  </p>
                </div>
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Pedidos pagos
                  </h1>
                  <p className="flex items-end text-white-50 text-xl font-bold">
                    {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(dash?.approved_value.toString(), locale)}{' '}
                    <TiArrowSortedUp className=" text-green-50" />
                  </p>
                </div>
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Ticket médio
                  </h1>
                  <p className="flex items-end text-white-50 text-xl font-bold">
                    {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(dash?.average_ticket.toString(), locale)}{' '}
                    <TiArrowSortedUp className=" text-green-50" />
                  </p>
                </div>
              </div>
              <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Vendas por dia
                  </h1>
                  <p className="flex items-end text-white-50 text-[13px] font-light">
                    Acompanhe o volume diário da sua empresa.
                  </p>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <LineChart
                    data={data}
                    labels={labels}
                    lineColor="#00CF79"
                    lineWidth={8}
                  />
                </div>
              </div>
              <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Vendas por método
                  </h1>
                  <p className="flex items-end text-white-50 text-[13px] font-light">
                    Valor em vendas no período.
                  </p>
                </div>
                <div className="flex justify-between items-center my-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <IoCardOutline className="w-9 h-9 text-green-50" />
                      <p className="font-medium text-[13px] text-green-50">
                        Cartão
                      </p>
                    </div>
                    <h1 className="text-white-50 text-xl font-medium">
                      {locale === 'en' ? '$' : 'R$'}{' '}
                      {formatCurrency(
                        byMethod?.data[0].value.toString(),
                        locale,
                      )}{' '}
                    </h1>
                    <p className="text-white-50 text-xs font-light">
                      Aumente suas vendas aplicando descontos e incentivos.
                    </p>
                  </div>
                  <div>
                    <CircularProgressBar
                      percentage={byMethod?.data[0].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="14"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <BiBarcode className="w-9 h-9 text-green-50" />
                      <p className="font-medium text-[13px] text-green-50">
                        Boleto
                      </p>
                    </div>
                    <h1 className="text-white-50 text-xl font-medium">
                      {locale === 'en' ? '$' : 'R$'}{' '}
                      {formatCurrency(
                        byMethod?.data[1].value.toString(),
                        locale,
                      )}{' '}
                    </h1>
                  </div>
                  <div>
                    <CircularProgressBar
                      percentage={byMethod?.data[1].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="14"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <MdOutlinePix className="w-9 h-9 text-green-50" />
                      <p className="font-medium text-[13px] text-green-50">
                        Pix
                      </p>
                    </div>
                    <h1 className="text-white-50 text-xl font-medium">
                      {locale === 'en' ? '$' : 'R$'}{' '}
                      {formatCurrency(
                        byMethod?.data[2].value.toString(),
                        locale,
                      )}{' '}
                    </h1>
                  </div>
                  <div>
                    <CircularProgressBar
                      percentage={byMethod?.data[2].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="14"
                    />
                  </div>
                </div>
              </div>
            </aside>
            <aside className="w-full xl:w-[30%]">
              <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between p-8">
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Índices
                  </h1>
                  <p className=" text-gray-50 text-[13px] font-light">
                    Boleto, PIX e chargebacks.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-start gap-2">
                  <div>
                    <CircularProgressBar
                      percentage={rates?.data[0].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="16"
                    />
                  </div>
                  <div>
                    <h1 className="text-white-50 text-base font-medium">
                      Boletos
                    </h1>
                    <p className="text-gray-50 text-[13px] font-medium">
                      Conversão
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-start gap-2">
                  <div>
                    <CircularProgressBar
                      percentage={rates?.data[1].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="16"
                    />
                  </div>
                  <div>
                    <h1 className="text-white-50 text-base font-medium">Pix</h1>
                    <p className="text-gray-50 text-[13px] font-medium">
                      Conversão
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-start gap-2">
                  <div>
                    <CircularProgressBar
                      percentage={rates?.data[2].percentage}
                      w="84"
                      h="84"
                      wLine="8"
                      fonte_size="16"
                    />
                  </div>
                  <div>
                    <h1 className="text-white-50 text-base font-medium">
                      Chargebacks
                    </h1>
                    <p className="text-gray-50 text-[13px] font-medium">
                      Conversão
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 py-8 px-4 h-[300px] overflow-hidden">
                <div className="overflow-auto px-4 pb-1">
                  <div className="sticky top-0 bg-gray-200">
                    <h1 className="text-white-50 text-base font-medium">
                      Parcelas no cartão
                    </h1>
                    <p className=" text-gray-50 text-[13px] font-light">
                      Número de transações
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center mt-6 gap-6">
                    {cardDetails?.data.map((item, index) => (
                      <div
                        key={index}
                        className="flex w-full rounded-[10px] items-center justify-between gap-16 border border-green-300 px-4 py-6"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <p className="font-medium text-[13px] text-gray-50">
                            {item.number_of_installments}x
                          </p>
                          <p className="font-bold text-[13px] text-green-50">
                            {item.total_transactions} transações
                          </p>
                        </div>
                        <CircularProgressBar
                          percentage={item.percentage}
                          w="50"
                          h="50"
                          wLine="6"
                          fonte_size="12"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
                <div>
                  <h1 className="text-white-50 text-base font-medium">
                    Taxa de Rastreio
                  </h1>
                </div>
                <div className="mt-4 flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <IoCardOutline className="w-9 h-9 text-green-50" />
                    <h1 className="text-white-50 font-medium text-base">
                      Aguardando envio
                    </h1>
                  </div>
                  <div className="flex w-full rounded-[10px] items-center justify-between gap-16 border border-gray-50 p-3">
                    <h1 className="text-white-50 text-base font-medium pl-24">
                      Total: {tracking?.data[0]?.total}
                    </h1>
                    <CircularProgressBar
                      percentage={tracking?.data[0]?.percentage}
                      w="50"
                      h="50"
                      wLine="6"
                      fonte_size="10"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <IoCardOutline className="w-9 h-9 text-green-50" />
                    <h1 className="text-white-50 font-medium text-base">
                      A caminho
                    </h1>
                  </div>
                  <div className="flex w-full rounded-[10px] items-center justify-between gap-16 border border-gray-50 p-3">
                    <h1 className="text-white-50 text-base font-medium pl-24">
                      Total: {tracking?.data[1]?.total}
                    </h1>
                    <CircularProgressBar
                      percentage={tracking?.data[1]?.percentage}
                      w="50"
                      h="50"
                      wLine="6"
                      fonte_size="10"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <IoCardOutline className="w-9 h-9 text-green-50" />
                    <h1 className="text-white-50 font-medium text-base">
                      Entregue
                    </h1>
                  </div>
                  <div className="flex w-full rounded-[10px] items-center justify-between gap-16 border border-gray-50 p-3">
                    <h1 className="text-white-50 text-base font-medium pl-24">
                      Total: {tracking?.data[2]?.total}
                    </h1>
                    <CircularProgressBar
                      percentage={tracking?.data[2]?.percentage}
                      w="50"
                      h="50"
                      wLine="6"
                      fonte_size="10"
                    />
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}
      </main>
      {!user?.data?.user.has_company && (
        <div className="w-full flex flex-col justify-center items-center mt-[200px]">
          <p className="text-[24px] font-bold text-white-100">
            Cresça sua empresa com a Nextion Pay
          </p>
          <p className="text-white-100 mb-4">
            Processe suas vendas com uma alta taxa de aprovação e menores taxas.
          </p>
          <div className="w-full md:w-[300px] ">
            <Button
              disabled={user?.data?.user.kyc_status !== 'approved'}
              onClick={() => router.push(`${locale}/companies/companyRegister`)}
              size="100%"
              variant="primary"
            >
              {' '}
              <BiAddToQueue size={20} /> Criar Empresa
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
