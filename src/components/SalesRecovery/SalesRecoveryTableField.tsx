import React, { useState } from 'react';
import { CustomTd } from '../Global/Table/CustomTd';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SiWhatsapp } from 'react-icons/si';
import { MdContentCopy } from 'react-icons/md';
import { handleName } from '@/utils/hacks/nameInitial';

interface TableFieldProps {
  item: any;
}

const SalesRecoveryTableField: React.FC<TableFieldProps> = ({ item }) => {
  const router = useRouter();
  const locale = useLocale();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sendId, setSendId] = useState('');

  const handleGetId = async (id: string) => {
    setSendId(id);
  };

  const handleRedirect = (id: string) => {
    router.push(`/${locale}/sales/salesRecovery/${id}`);
  };
  return (
    <>
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={() => {handleGetId(item.id), handleRedirect(sendId)}}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-2">
            <dl className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-gray-50 font-bold text-[15px]">
              {handleName(item.name)}
            </dl>
            <dl>
              <dl className="text-white-50 text-xs font-medium">{item.name}</dl>
              <dl className="text-gray-50 text-[10px] font-light">
                {item.email}
              </dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="flex items-center text-white-50 text-base font-bold">
            {item.paymentValue}
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="flex items-center text-white-50 text-base font-medium">
            {item.emailQuantity}
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="flex items-center text-white-50 text-base font-medium">
            {item.smsQuantity}
          </dl>
        </CustomTd>
        <CustomTd>
          {item.status === 'Recuperado' && (
            <span className="flex items-center justify-center rounded-[10px] bg-green-50 px-2 py-1.5 h-5 text-xs font-medium text-white-50">
              {item.status}
            </span>
          )}
          {item.status === 'Não recuperado' && (
            <span className="flex items-center justify-center rounded-[10px] bg-red-100 px-2 py-1.5 h-5 text-xs font-medium text-white-50">
              {item.status}
            </span>
          )}
        </CustomTd>
        <CustomTd variant="roundedRight">
          <dl className="text-white-50 gap-2 flex items-center">
            <SiWhatsapp size={20} />
            <MdContentCopy size={20} />
          </dl>
        </CustomTd>
      </tr>
    </>
  );
};

export default SalesRecoveryTableField;
