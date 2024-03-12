import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import React, { useState } from 'react';
import CategoryDetailModal from './Modals/CategoryDetailModal';
import UpdateCategoryModal from './Modals/UpdateCategoryModal';


interface StoreCardProps {
  name: string;
  description: string;
  is_active: boolean;
  id: string;
  store_uuid: string;
}

const CategoriesCard = (props: StoreCardProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };
  return (
    <>
      <CategoryDetailModal
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        setOpenUpdateModal={setOpenUpdateModal}
        id={sendId}
        store_uuid={props.store_uuid}
      />

      <UpdateCategoryModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={sendId}
        store_uuid={props.store_uuid}
      />
      <div
        onClick={() => {
          handleGetId(props.id), setOpenDetailModal(true);
        }}
        className="w-full flex flex-col border p-4 border-gray-50 rounded-[10px] justify-between"
      >
        <div className="text-green-50 text-sm font-medium">{props.name}</div>
        <div className="flex flex-col justify-between items-center h-full mt-2 gap-3">
          <div className="text-white-50 text-sm font-medium">
            {props.description}
          </div>
          {props.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-green-50 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Ativo
            </span>
          )}
          {!props.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-red-100 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Inativo
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesCard;
