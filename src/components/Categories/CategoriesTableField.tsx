import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import { CategoriesList } from '@/interfaces/categoriesInterfaces/categories';
import UpdateCategoryModal from './Modals/UpdateCategoryModal';
import CategoryDetailModal from './Modals/CategoryDetailModal';
interface TableFieldProps {
  item: CategoriesList;
  store_uuid: string;
}

const CategoriesTableField: React.FC<TableFieldProps> = ({
  item,
  store_uuid,
}) => {
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
        store_uuid={store_uuid}
      />

      <UpdateCategoryModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={sendId}
        store_uuid={store_uuid}
      />
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => {
          handleGetId(item.id), setOpenDetailModal(true);
        }}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left">
            <dl className="text-green-50 text-sm font-medium">{item?.name}</dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-xs font-medium">
            {item.description}
          </dl>
        </CustomTd>
        <CustomTd variant="roundedRight">
          {item?.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-green-50 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Ativa
            </span>
          )}
          {!item?.is_active && (
            <span className="flex items-center justify-center rounded-[10px] bg-red-100 px-3 py-1.5 h-5 text-xs font-medium text-white-50">
              Inativa
            </span>
          )}
        </CustomTd>
      </tr>
    </>
  );
};

export default CategoriesTableField;
