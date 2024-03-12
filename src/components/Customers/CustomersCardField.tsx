import React from 'react';
import StoresCard from './CustomersCard';
import { StoresListModel } from '@/interfaces/storesInterfaces/stores';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import { CustomersByCompanyListModel } from '@/interfaces/customersInterfaces/customers';
import CustomersCard from './CustomersCard';

interface CardFieldProps {
  customers?: CustomersByCompanyListModel;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const CustomersCardField: React.FC<CardFieldProps> = ({
  customers,
  page,
  setPage,
  isLoading,
}) => {
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-6 space-y-4">
      {customers?.data.map((item, index) => (
        <CustomersCard
          key={index}
          name={item.name}
          email={item.email}
          document={item.official_id_number}
          createDate={item.created_at}
          id={item.id}
        />
      ))}
     <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={customers} />
    </div>
  );
};

export default CustomersCardField;
