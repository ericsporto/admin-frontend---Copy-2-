import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import React, { useState } from 'react';
import { FaLink } from 'react-icons/fa';

interface ProductsCardProps {
  name: string;
  status: boolean;
  createDate: string;
  id: string;
}

const ProductsCard = (props: ProductsCardProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };
  return (
    <>
      {/* <StoreDetailModal
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        setOpenUpdateModal={setOpenUpdateModal}
        id={sendId}
        status={props.status}
      /> */}
      {/*
      <UpdateStoreModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={sendId}
      /> */}
      <div
        /* onClick={() => {
          handleGetId(props.id), setOpenDetailModal(true);
        }} */
        className="w-full h-[160px] flex flex-col border p-4 border-gray-50 rounded-[10px] justify-between"
      >
        <div className="flex items-center text-left gap-2">
          <div className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
            {props.name && handleName(props.name)}
          </div>
          <div>
            <p className="text-white-50 text-[15px] font-medium">
              {props.name}
            </p>
            {/*  <p className="text-gray-50 text-[12px] font-light">{props.email}</p> */}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center h-full mt-4 gap-2">
          {props.status && (
            <span className="flex items-center justify-center rounded-[10px] bg-green-50 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Ativo
            </span>
          )}
          {!props.status && (
            <span className="flex items-center justify-center rounded-[10px] bg-red-100 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Inativo
            </span>
          )}
          <div className="text-white-50 text-base font-medium">
            {editDateWithHours(props.createDate)}
          </div>
          <div className="text-white-50 text-base font-medium">
            <FaLink size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
