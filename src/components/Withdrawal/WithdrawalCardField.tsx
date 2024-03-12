import React from 'react';
import StoresCard from './WithdrawalCard';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';

interface CardFieldProps {
  withdrawal?: any;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const WithdrawalCardField: React.FC<CardFieldProps> = ({
  withdrawal,
  page,
  setPage,
  isLoading,
}) => {
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-6 space-y-4">
      {withdrawal.map(({ item, index }: any) => (
        <StoresCard
          key={index}
          value={"#"}
          date={"#"}
          tax={"#"}
          id={"#"}
        />
      ))}
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      {/* <Paginate setPage={setPage} page={page} data={stores} /> */}
    </div>
  );
};

export default WithdrawalCardField;
