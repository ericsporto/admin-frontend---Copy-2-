'use client';
import CustomersCardField from '@/components/Customers/CustomersCardField';
import CustomersTable from '@/components/Customers/CustomersTable';
import NoData from '@/components/Global/NoData';
import useFetchCustomers from '@/requests/queries/customersQueries/getCustomers';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import useUserStore from '@/stores/useAuthStore';
import { useState } from 'react';
import { MdPersonOff } from 'react-icons/md';

function Customers() {
  const { data: company } = useFetchCompaniesDropdown();
  const [page, setPage] = useState(1);
  const { user } = useUserStore();
  const { data: customers, isLoading } = useFetchCustomers(
    user?.user.has_company && company ? (company[0].id as string) : '',
  );
  const titles = ['Nome', 'E-mail', 'CPF/CNPJ', 'Data de criação'];

  return (
    <main className="flex flex-col xl:p-2">
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">Clientes</h1>
          <p className="text-sm font-light text-white-50">
            {customers && customers?.data?.length > 0
              ? `${customers?.data?.length} Registros`
              : 'Todos os seus clientes aparecerão aqui.'}
          </p>
        </div>
      </div>
      {customers?.data && customers?.data?.length > 0 ? (
        <>
          <CustomersTable
            titles={titles}
            page={page}
            customers={customers}
            setPage={setPage}
            isLoading={isLoading}
          />

          <CustomersCardField
            customers={customers}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
          />
        </>
      ) : (
        <NoData
          icon={<MdPersonOff size={40} className="text-gray-50" />}
          description="Nenhum cliente, quando houverem serão exibidos aqui."
        />
      )}
    </main>
  );
}

export default Customers;
