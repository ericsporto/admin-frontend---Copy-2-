import React, { useState } from 'react';
import WithdrawalDetailModal from './Modals/WithdrawalDetailModal';

interface CardProps {
  id: string;
  value: string;
  date: string;
  tax: string;
}

const WithdrawalCard = (props: CardProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };
  return (
    <>
      <WithdrawalDetailModal
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        id={sendId}
      />
      <div
        onClick={() => {
          handleGetId(props.id), setOpenDetailModal(true);
        }}
        className="w-full flex flex-col border p-4 border-gray-50 rounded-[10px] justify-between"
      >
        <div className="flex items-center text-left gap-2 text-base font-medium text-white-50">
          #0000000
        </div>
        <div className="flex justify-center items-center mt-6 gap-1">
          <p className="text-gray-50 text-base font-medium">Valor:</p>
          <p className="text-white-50 text-base font-bold">R$1.200,00</p>
        </div>
        <div className="flex justify-center items-center mt-1 gap-1">
          <p className="text-gray-50 text-base font-medium">Valor líquido:</p>
          <p className="text-white-50 text-base font-bold">R$1.200,00</p>
        </div>
        <div className="flex justify-center items-center mt-1 gap-1">
          <p className="text-gray-50 text-base font-medium">Taxas:</p>
          <p className="text-white-50 text-base font-bold">R$50,00</p>
        </div>
        <div className="flex justify-center items-center mt-1 gap-1">
          <p className="text-gray-50 text-base font-medium">Data de criação:</p>
          <p className="text-white-50 text-base font-medium">05 Mar. 2024</p>
        </div>
        <div className="flex justify-center items-center mt-1 gap-1">
          <p className="text-gray-50 text-base font-medium">Data de aprovação:</p>
          <p className="text-white-50 text-base font-medium">05 Mar. 2024</p>
        </div>
      </div>
    </>
  );
};

export default WithdrawalCard;
