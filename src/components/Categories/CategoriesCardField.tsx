import React from 'react';
import { StoresListModel } from '@/interfaces/storesInterfaces/stores';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import CategoriesCard from './CategoriesCard';
import { CategoriesListModel } from '@/interfaces/categoriesInterfaces/categories';

interface CardFieldProps {
  categories?: CategoriesListModel;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  store_uuid: string;
}

const CategoriesCardField: React.FC<CardFieldProps> = ({
  categories,
  page,
  setPage,
  isLoading,
  store_uuid,
}) => {
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-6 space-y-4">
      {categories?.data.map((item, index) => (
        <CategoriesCard
          key={index}
          name={item?.name}
          description={item?.description}
          is_active={item?.is_active}
          id={item?.id}
          store_uuid={store_uuid}
        />
      ))}
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={categories} />
    </div>
  );
};

export default CategoriesCardField;
