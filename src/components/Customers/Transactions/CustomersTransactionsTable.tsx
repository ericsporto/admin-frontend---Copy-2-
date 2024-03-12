'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Spinner from '../../Global/Spinner';
import Paginate from '../../Global/Pagination';
import { TransactionsByCustomerModel } from '@/interfaces/customersInterfaces/customers';
import CustomTable from '@/components/Global/Table/CustomTable';
import CustomersTransactionsTableField from './CustomersTransactionsTableField';

interface TableProps {
  titles: string[];
  page: number;
  transactions?: TransactionsByCustomerModel;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const CustomersTransactionsTable: React.FC<TableProps> = ({
  titles,
  page,
  setPage,
  transactions,
  isLoading,
}) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
      <CustomTable titles={titles}>
        {transactions?.data.map((item, index) => (
          <CustomersTransactionsTableField key={index} item={item} />
        ))}
      </CustomTable>
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={transactions} />
    </div>
  );
};

export default CustomersTransactionsTable;
