'use client';
import React from 'react';
import CustomTable from '../Global/Table/CustomTable';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import TransactionsTableField from './TransactionsTableField';
import { SalesModel } from '@/interfaces/salesInterfaces/sales';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';

interface TableProps {
  titles: string[];
  page: number;
  sales?: SalesModel | null;
  setPage: (page: number) => void;
  isLoading: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const TransactionsTable: React.FC<TableProps> = ({
  titles,
  page,
  setPage,
  isLoading,
  sales,
}) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      {sales && sales.data.length > 0 && (
        <div className="hidden xl:flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
          <CustomTable titles={titles}>
            {sales?.data.map((item, index) => (
              <TransactionsTableField key={index} item={item} />
            ))}
          </CustomTable>
          <div className="w-full flex justify-center">
            {isLoading && <Spinner />}
          </div>
          <Paginate setPage={setPage} page={page} data={sales} />
        </div>
      )}
    </>
  );
};

export default TransactionsTable;
