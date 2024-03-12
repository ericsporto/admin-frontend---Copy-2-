'use client';
import React from 'react';
import CustomTable from '../Global/Table/CustomTable';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import StoresTableField from './CustomersTableField';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import { CustomersByCompanyListModel } from '@/interfaces/customersInterfaces/customers';
import CustomersTableField from './CustomersTableField';

interface TableProps {
  titles: string[];
  page: number;
  customers?: CustomersByCompanyListModel;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const CustomersTable: React.FC<TableProps> = ({
  titles,
  page,
  setPage,
  customers,
  isLoading,
}) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="hidden xl:flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
      <CustomTable titles={titles}>
        {customers?.data.map((item, index) => (
          <CustomersTableField key={index} item={item} />
        ))}
      </CustomTable>
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={customers} />
    </div>
  );
};

export default CustomersTable;
