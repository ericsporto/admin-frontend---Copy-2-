import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import WithdrawalDetailModal from './Modals/WithdrawalDetailModal';

interface TableFieldProps {
  item: any;
}

const WithdrawalTableField: React.FC<TableFieldProps> = ({ item }) => {
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
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => {
          handleGetId("5"), setOpenDetailModal(true);
        }}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex justify-center items-center text-white-50 text-base font-medium">#000000000</dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-base font-bold">R$1.2000</dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-base font-bold">R$50,00</dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-base font-bold">R$1.200,00</dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-base font-medium ">5 MAR. 2024</dl>
        </CustomTd>
        <CustomTd variant="roundedRight">
          <dl className="text-white-50 text-base font-medium ">5 MAR. 2024</dl>
        </CustomTd>
      </tr>
    </>
  );
};

export default WithdrawalTableField;
