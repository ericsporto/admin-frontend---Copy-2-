import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import { FaLink } from 'react-icons/fa';
import UpdateProductModal from './Modals/UpdateProductModal';
import { ProductsList } from '@/interfaces/productsInterfaces/products';

interface ProductsTableFieldProps {
  item: ProductsList;
  store_uuid: string
}

const ProductsTableField: React.FC<ProductsTableFieldProps> = ({ item, store_uuid }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };
  return (
    <>
      <UpdateProductModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        product_uuid={sendId}
        store_uuid={store_uuid}
      />
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => {
          handleGetId(item.id), setOpenUpdateModal(true);
        }}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-2">
            <dl className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
              {item.name && handleName(item.name)}
            </dl>
            <dl>
              <dl className="text-white-50 text-xs font-medium">{item.name}</dl>
             {/*  <dl className="text-gray-50 text-[10px] font-light">
                {item.current_stock}
              </dl> */}
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

export default ProductsTableField;
