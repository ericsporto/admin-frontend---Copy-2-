import React from 'react';
import StoresCard from './StoresCard';
import { StoresListModel } from '@/interfaces/storesInterfaces/stores';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';

interface StoresCardFieldProps {
  stores?: StoresListModel;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const StoresCardField: React.FC<StoresCardFieldProps> = ({
  stores,
  page,
  setPage,
  isLoading,
}) => {
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-6 space-y-4">
      {stores?.data.map((item, index) => (
        <StoresCard
          key={index}
          name={item.name}
          email={item.support_email}
          status={item.is_active}
          createDate={item.created_at}
          id={item.id}
        />
      ))}
     <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={stores} />
    </div>
  );
};

export default StoresCardField;
