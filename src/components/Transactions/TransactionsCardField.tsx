import React from 'react';
import TransactionsCard from './TransactionsCard';
import { SalesModel } from '@/interfaces/salesInterfaces/sales';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface CardFieldProps {
  sales?: SalesModel | null;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}

const TransactionsCardField: React.FC<CardFieldProps> = ({
  sales,
  page,
  setPage,
  isLoading,
}) => {
  return (
    <>
      {sales && sales?.data.length > 0 && (
        <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-8 space-y-3">
          {sales?.data.map((item, index) => (
            <TransactionsCard
              key={index}
              name={item.customer.name}
              email={item.customer.email}
              status={item.status}
              transactionValue={item.total_price_with_shipping}
              productTitle={item.products[0]?.name}
              payment={item.payment}
              transactionDate={item.created_at}
            />
          ))}
          <div className="w-full flex justify-center">
            {isLoading && <Spinner />}
          </div>
          <Paginate setPage={setPage} page={page} data={sales} />
        </div>
      )}
      {sales?.data.length === 0 && (
        <p className="text-base text-white-50 font-medium px-2 mt-8">
          Não há resultados para esta filtragem!
        </p>
      )}
    </>
  );
};

export default TransactionsCardField;
