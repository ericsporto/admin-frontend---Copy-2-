import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Sales } from '@/interfaces/salesInterfaces/sales';
import { handleName } from '@/utils/hacks/nameInitial';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import { statusTranslate } from '@/utils/hacks/statusTranslate';
import { editDateWithHours } from '@/utils/hacks/editDate';

interface TableFieldProps {
  item: Sales;
}

const TransactionsTableField: React.FC<TableFieldProps> = ({ item }) => {
  const router = useRouter();
  const locale = useLocale();
  const [sendId, setSendId] = useState('');

  const handleRedirect = (id: string) => {
    router.push(`/${locale}/sales/transactions/${id}`);
  };
  return (
    <>
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => handleRedirect(item.id)}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-2">
            <dl className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-gray-50 font-bold text-[15px] w-[35px] h-[35px]">
              {item.customer.name && handleName(item.customer.name)}
            </dl>
            <dl>
              <dl className="text-white-50 text-xs font-medium">
                {item.customer.name}
              </dl>
              <dl className="text-gray-50 text-[10px] font-light">
                {item.customer.email}
              </dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="flex items-center text-left gap-2">
            <Image
              src={
                item.payment.method === 'pix'
                  ? '/images/pix-icon.svg'
                  : item.payment.method === 'bank_transfer' ||
                      item.payment.method === 'bank_slip'
                    ? '/images/boleto-icon.svg'
                    : '/images/card-icon.svg'
              }
              alt="master-icon"
              width={40}
              height={50}
            />
            <dl>
              <dl className="text-white-50 text-xs font-medium">
                {locale === 'en' ? '$' : 'R$'}{' '}
                {formatCurrency(
                  item?.total_price_with_shipping.toString(),
                  locale,
                )}
              </dl>
              <dl className="text-gray-50 text-[10px] font-light">À vista</dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          {(item.status === 'payment_received' ||
            item.status === 'completed') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
          {(item.status === 'awaiting_payment' ||
            item.status === 'open_dispute') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-yellow-100 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
          {(item.status === 'cancelled' || item.status === 'expired') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
        </CustomTd>
        <CustomTd>
          <dl className="flex flex-col text-white-50 text-xs font-medium justify-center items-center">
            <dl>{item?.products[0]?.name}</dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-xs font-medium">
            {editDateWithHours(item.created_at)}
          </dl>
        </CustomTd>
        <CustomTd variant="roundedRight">
          <dl className="text-white-50 text-xs font-medium">
            {item.payment.paid_at_for_humans}
          </dl>
        </CustomTd>
      </tr>
    </>
  );
};

export default TransactionsTableField;
