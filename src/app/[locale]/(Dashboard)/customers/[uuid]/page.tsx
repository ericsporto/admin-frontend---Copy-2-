'use client';
import { useLocale, useTranslations } from 'next-intl';
import useFetchCustomerById from '@/requests/queries/customersQueries/getCustomerById';
import { handleName } from '@/utils/hacks/nameInitial';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import useFetchCustomerTransactions from '@/requests/queries/customersQueries/getCustomerTransactions';
import CircularProgressBar from '@/components/Global/CircularProgressBar';
import useFetchCustomerTransactionsDashboard from '@/requests/queries/customersQueries/getCustomerTransactionsDashboard';
import CustomersTransactionsTable from '@/components/Customers/Transactions/CustomersTransactionsTable';
import { useState } from 'react';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import useUserStore from '@/stores/useAuthStore';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';

type PageProps = {
  params: {
    uuid: string;
  };
};

function CustomerDetails({ params: { uuid } }: PageProps) {
  const { user } = useUserStore();
  const t = useTranslations('Home');
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const { data: company } = useFetchCompaniesDropdown();
  const { data: customer } = useFetchCustomerById(
    user?.user.has_company && company ? (company[0].id as string) : '',
    uuid,
  );
  const { data: transactions, isLoading: transactionsIsLoading } =
    useFetchCustomerTransactions(company && (company[0].id as string), uuid);
  const { data: dashboard } = useFetchCustomerTransactionsDashboard(
    company && (company[0].id as string),
    uuid,
  );
  const titles = ['Pagamento', 'Item', 'Status'];

  return (
    <main className="w-full flex flex-col justify-between items-start xl:px-2 py-3 gap-7">
      <div className="flex flex-col xl:flex-row justify-between items-center w-full">
        <h1 className="text-green-50 text-2xl font-bold my-4 xl:my-0">
          Detalhes do cliente
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row justify-between w-full gap-6">
        <aside className="w-full xl:w-[70%] flex flex-col">
          <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between p-8">
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="text-white-50 text-base font-medium">Cliente</h2>
                <div className="flex items-center text-left gap-2 mt-1">
                  <div className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px]">
                    {handleName(customer?.data?.name)}
                  </div>
                  <div>
                    <p className="text-white-50 text-xs font-medium">
                      {customer?.data?.name}
                    </p>
                    <p className="text-gray-50 text-[11px] font-light">
                      {customer?.data?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between xl:justify-start gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  CPF/CNPJ
                </p>
                <h1 className="text-white-50 text-base font-medium">
                  {formatCnpjCpf(customer?.data?.official_id_number)}
                </h1>
              </div>
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Telefone
                </p>
                <h1 className="text-white-50 text-base font-medium">
                  {customer?.data?.official_id_number}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between mt-8">
            <div className="flex justify-between items-center w-full px-8 pt-8">
              <div className="z-50">
                <h3 className="text-white-50 text-base font-medium">Compras</h3>
                <p className="text-gray-50 text-base font-light">
                  {transactions?.data.data.length} Registros
                </p>
              </div>
            </div>
            <div className="-mt-14">
              <CustomersTransactionsTable
                titles={titles}
                page={page}
                setPage={setPage}
                isLoading={transactionsIsLoading}
                transactions={transactions?.data}
              />
            </div>
          </div>
        </aside>
        <aside className="w-full xl:w-[30%]">
          <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between p-6">
            <h1 className="text-white-50 text-base font-medium">
              Vendas realizadas
            </h1>
            <div className="mt-2 flex items-center justify-start gap-4">
              <div className="w-[70%]">
                <p className="text-white-50 text-xl font-bold">
                  {locale === 'en' ? '$' : 'R$'}{' '}
                  {formatCurrency(
                    dashboard?.data.total_sales_value.toString(),
                    locale,
                  )}
                </p>
                <p className="text-gray-50 text-xs font-medium">
                  Quantidade: {dashboard?.data.total_sales}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-6">
            <h1 className="text-white-50 text-base font-medium">
              Vendas pendentes
            </h1>
            <div className="mt-2 flex items-center justify-start gap-4">
              <div className="w-[70%]">
                <p className="text-white-50 text-xl font-bold">
                  {locale === 'en' ? '$' : 'R$'}{' '}
                  {formatCurrency(
                    dashboard?.data.sales_awaiting_payment_value.toString(),
                    locale,
                  )}
                </p>
                <p className="text-gray-50 text-xs font-medium">
                  Quantidade: {dashboard?.data.sales_awaiting_payment}
                </p>
              </div>
              <CircularProgressBar
                percentage={
                  dashboard?.data.sales_awaiting_payment_percentage || 0
                }
                w="84px"
                h="84px"
                wLine="8px"
                fonte_size="20px"
              />
            </div>
          </div>
          <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-6">
            <h1 className="text-white-50 text-base font-medium">
              Vendas canceladas
            </h1>
            <div className="mt-2 flex items-center justify-start gap-4">
              <div className="w-[70%]">
                <p className="text-white-50 text-xl font-bold">
                  {locale === 'en' ? '$' : 'R$'}{' '}
                  {formatCurrency(
                    dashboard?.data.sales_cancelled_value.toString(),
                    locale,
                  )}
                </p>
                <p className="text-gray-50 text-xs font-medium">
                  Quantidade: {dashboard?.data.sales_cancelled}
                </p>
              </div>
              <CircularProgressBar
                percentage={dashboard?.data.sales_cancelled_percentage || 0}
                w="84px"
                h="84px"
                wLine="8px"
                fonte_size="20px"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CustomerDetails;
