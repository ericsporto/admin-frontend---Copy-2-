import React from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { MdContentCopy } from 'react-icons/md';

interface CardProps {
  name: string;
  email: string;
  paymentValue: string;
  status: string;
  emailQuantity: string;
  smsQuantity: string;
}

const SalesRecoveryCard = (props: CardProps) => {
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
      <div className="flex flex-col w-full items-center justify-center text-center gap-2 mt-2">
        <div className="flex gap-1">
          <span className="text-gray-50 text-base font-medium">E-mail:</span>
          <p className="text-white-50 text-base font-medium">
            {props.emailQuantity}
          </p>
        </div>
        <div className="flex gap-1">
          <span className="text-gray-50 text-base font-medium">SMS:</span>
          <p className="text-white-50 text-base font-medium">
            {props.smsQuantity}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center text-center gap-2 mt-2">
        <p className="text-white-50 text-base font-bold">
          {props.paymentValue}
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-2 mt-2 text-white-50">
        <SiWhatsapp size={20} />
        <MdContentCopy size={20} />
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        {props.status === 'Recuperado' && (
          <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 py-0.5 h-4 text-xs font-medium text-white-50">
            {props.status}
          </span>
        )}
        {props.status === 'Não recuperado' && (
          <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 py-0.5 h-4 text-xs font-medium text-white-50">
            {props.status}
          </span>
        )}
      </div>
    </div>
  );
};

export default SalesRecoveryCard;
