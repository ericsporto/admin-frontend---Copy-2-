'use client';
import React from 'react';
import CustomTable from '../Global/Table/CustomTable';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import WithdrawalTableField from './WithdrawalTableField';

interface TableProps {
  titles: string[];
  page: number;
  withdrawal?: any;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const WithdrawalTable: React.FC<TableProps> = ({
  titles,
  page,
  setPage,
  withdrawal,
  isLoading,
}) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="hidden xl:flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
      <CustomTable titles={titles}>
        {withdrawal?.map(({item, index}: any) => (
          <WithdrawalTableField key={index} item={item} />
        ))}
      </CustomTable>
      {/* <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div> */}
      {/* <Paginate setPage={setPage} page={page} data={stores} /> */}
    </div>
  );
};

export default WithdrawalTable;
