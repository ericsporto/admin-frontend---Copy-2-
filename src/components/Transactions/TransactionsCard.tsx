import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import { statusTranslate } from '@/utils/hacks/statusTranslate';
import { editDateWithHours } from '@/utils/hacks/editDate';

interface TransactionsCardProps {
  name: string;
  email: string;
  status: string;
  transactionValue: number;
  productTitle: string;
  transactionDate: string;
  payment: any
}

const TransactionsCard = (props: TransactionsCardProps) => {
  const locale = useLocale();
  return (
    <div className="w-full flex flex-col border p-2 border-gray-50 rounded-[10px] justify-between">
      <div className="flex items-center text-left gap-2">
        <div className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-gray-50 font-bold text-[15px]">
          CE
        </div>
        <div>
          <p className="text-white-50 text-[15px] font-medium">{props.name}</p>
          <p className="text-gray-50 text-[12px] font-light">{props.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center text-left gap-2 mt-2">
        <Image
          src={
            props.payment.method === 'pix'
              ? '/images/pix-icon.svg'
              : props.payment.method === 'bank_transfer' ||
                  props.payment.method === 'bank_slip'
                ? '/images/boleto-icon.svg'
                : '/images/card-icon.svg'
          }
          alt="master-icon"
          width={40}
          height={50}
        />
        <div>
          <p className="text-white-50 text-base font-bold">
            {locale === 'en' ? '$' : 'R$'}{' '}
            {formatCurrency(props?.transactionValue.toString(), locale)}
          </p>
          <p className="text-gray-50 text-[11px] font-light">À Vista</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 mt-2">
        {(props.status === 'payment_received' ||
          props.status === 'completed') && (
          <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
            {statusTranslate(props.status)}
          </span>
        )}
        {(props.status === 'awaiting_payment' ||
          props.status === 'open_dispute') && (
          <span className="flex items-center w-fit justify-center rounded-[10px] bg-yellow-100 px-2.5 h-5 text-xs font-medium text-white-50">
            {statusTranslate(props.status)}
          </span>
        )}
        {(props.status === 'cancelled' || props.status === 'expired') && (
          <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 h-5 text-xs font-medium text-white-50">
            {statusTranslate(props.status)}
          </span>
        )}
        <div className="text-white-50 text-xs font-medium">
          {props.productTitle}
        </div>
        <div className="text-white-50 text-base font-medium">
          {editDateWithHours(props.transactionDate)}
        </div>
        <div className="text-white-50 text-base font-medium">
          {props.payment.paid_at_for_humans}
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
