import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import { StoresList } from '@/interfaces/storesInterfaces/stores';
import { editDateWithHours } from '@/utils/hacks/editDate';
import StoreDetailModal from './Modals/StoreDetailModal';
import UpdateStoreModal from './Modals/UpdateStoreModal';
import { handleName } from '@/utils/hacks/nameInitial';

interface StoresTableFieldProps {
  item: StoresList;
}

const StoresTableField: React.FC<StoresTableFieldProps> = ({ item }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };
  return (
    <>
      <StoreDetailModal
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        setOpenUpdateModal={setOpenUpdateModal}
        id={sendId}
        status={item.is_active}
      />

      <UpdateStoreModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={sendId}
      />
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => {
          handleGetId(item.id), setOpenDetailModal(true);
        }}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-2">
            <dl className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
              {item.name && handleName(item.name)}
            </dl>
            <dl>
              <dl className="text-white-50 text-xs font-medium">{item.name}</dl>
              <dl className="text-gray-50 text-[10px] font-light">
                {item.support_email}
              </dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          {item.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-green-50 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Ativo
            </span>
          )}
          {!item.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-red-100 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Inativo
            </span>
          )}
        </CustomTd>
        <CustomTd variant="roundedRight">
          <dl className="text-white-50 text-xs font-medium">
            {editDateWithHours(item.created_at)}
          </dl>
        </CustomTd>
      </tr>
    </>
  );
};

export default StoresTableField;
