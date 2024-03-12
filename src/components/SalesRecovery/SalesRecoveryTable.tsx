'use client';
import React from 'react';
import CustomTable from '../Global/Table/CustomTable';
import { CustomTd } from '../Global/Table/CustomTd';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import SalesRecoveryTableField from './SalesRecoveryTableField';

interface TransactionsTableProps {
  titles: string[];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const SalesRecoveryTable: React.FC<TransactionsTableProps> = ({ titles }) => {
  const locale = useLocale();
  const router = useRouter();
  const paginate = ['1', '2', '3', '4', '10'];

  const mockObject = [
    {
      id: '1',
      name: 'Client Example',
      email: 'client@example.com',
      paymentValue: 'R$160,00',
      status: 'Recuperado',
      emailQuantity: '2 enviados',
      smsQuantity: '2 enviados',
    },
    {
      id: '2',
      name: 'Client Example',
      email: 'client@example.com',
      paymentValue: 'R$160,00',
      status: 'Não recuperado',
      emailQuantity: '2 enviados',
      smsQuantity: '2 enviados',
    },
  ];

  return (
    <div className="hidden xl:flex flex-col rounded-[20px] bg-gray-200 mt-10 pb-8">
      <CustomTable titles={titles}>
        {mockObject.map((item, index) => (
          <SalesRecoveryTableField key={index} item={item}/>
        ))}
      </CustomTable>
      <div className="flex w-full my-3 justify-end px-8">
        {paginate.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'flex justify-center items-center rounded-[10px] p-3 w-10 text-[13px] font-medium text-white-50 cursor-pointer',
              item === '1'
                ? 'bg-green-50'
                : 'bg-gray-900 hover:bg-gray-800 transition-all ease-in-out'
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesRecoveryTable;
