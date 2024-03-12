'use client';
import React from 'react';
import CustomTable from '../Global/Table/CustomTable';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import CategoriesTableField from './CategoriesTableField';
import { CategoriesListModel } from '@/interfaces/categoriesInterfaces/categories';

interface TableProps {
  titles: string[];
  page: number;
  categories: CategoriesListModel;
  setPage: (page: number) => void;
  isLoading: boolean;
  store_uuid: string;
}

const CategoriesTable: React.FC<TableProps> = ({
  titles,
  page,
  setPage,
  categories,
  isLoading,
  store_uuid,
}) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="hidden xl:flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
      <CustomTable titles={titles}>
        {categories?.data.map((item, index) => (
          <CategoriesTableField
            key={index}
            item={item}
            store_uuid={store_uuid}
          />
        ))}
      </CustomTable>
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={categories} />
    </div>
  );
};

export default CategoriesTable;
