'use client';
import CustomersCardField from '@/components/Customers/CustomersCardField';
import CustomersTable from '@/components/Customers/CustomersTable';
import { Button } from '@/components/Global/Button';
import NoData from '@/components/Global/NoData';
import CreateWithdrawalModal from '@/components/Withdrawal/Modals/CreateWithdrawalModal';
import WithdrawalCardField from '@/components/Withdrawal/WithdrawalCardField';
import WithdrawalTable from '@/components/Withdrawal/WithdrawalTable';
import useFetchCustomers from '@/requests/queries/customersQueries/getCustomers';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { MdMoneyOff, MdPersonOff } from 'react-icons/md';

function Withdrawal() {
  const { data: company } = useFetchCompaniesDropdown();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const titles = [
    'ID',
    'Valor',
    'Taxas',
    'Valor líquido',
    'Data de criação',
    'Data de aprovação',
  ];

  const data = [
    {
      id: '#0000000',
      value: 'R$1.200,00',
      tax: 'R$50,00',
      date: '05 Mar. 2024',
    },
    {
      id: '#0000000',
      value: 'R$1.200,00',
      tax: 'R$50,00',
      date: '05 Mar. 2024',
    },
    {
      id: '#0000000',
      value: 'R$1.200,00',
      tax: 'R$50,00',
      date: '05 Mar. 2024',
    },
  ];

  return (
    <>
      <CreateWithdrawalModal open={openModal} setOpen={setOpenModal} />
      <main className="flex flex-col xl:p-2">
        <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
          <div className="flex flex-col items-center xl:items-start">
            <h1 className="text-green-50 text-2xl font-bold">Saques</h1>
            {/*  <p className="text-sm font-light text-white-50">
            {customers && customers?.data?.length > 0
              ? `${customers?.data?.length} Registros`
              : 'Todos os seus saques aparecerão aqui.'}
          </p> */}
          </div>
          <div className="flex w-[300px]">
            <Button size="100%" onClick={() => setOpenModal(true)}>
              <BiAddToQueue size={24} />
              <span className="text-base font-bold text-white-200">
                Criar novo saque
              </span>
            </Button>
          </div>
        </div>
        {data.length > 0 ? (
          <>
            <WithdrawalTable
              titles={titles}
              page={page}
              withdrawal={data}
              setPage={setPage}
              isLoading={false}
            />
            <WithdrawalCardField
              withdrawal={data}
              page={page}
              setPage={setPage}
              isLoading={false}
            />
          </>
        ) : (
          <NoData
            icon={<MdMoneyOff size={40} className="text-gray-50" />}
            description="Nenhuma saque registrado, quando houverem serão exibidas aqui."
          />
        )}
      </main>
    </>
  );
}

export default Withdrawal;
