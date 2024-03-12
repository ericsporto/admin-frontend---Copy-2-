import { CustomTd } from '../Global/Table/CustomTd';
import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import { CustomersByCompanyList } from '@/interfaces/customersInterfaces/customers';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface TableFieldProps {
  item: CustomersByCompanyList;
}

const CustomersTableField: React.FC<TableFieldProps> = ({ item }) => {
  const router = useRouter()
  const locale = useLocale()

  const handleRedirect = async () => {
    router.push(`/${locale}/customers/${item.id}`);
  };
  return (
    <>
      <tr
        className="cursor-pointer hover:opacity-50"
        onClick={handleRedirect}
      >
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-2">
            <dl className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
              {item.name && handleName(item.name)}
            </dl>
            <dl>
              <dl className="text-white-50 text-[13px] font-medium">{item.name}</dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-gray-50 text-base font-light">{item.email}</dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-white-50 text-base font-medium">{formatCnpjCpf(item.official_id_number)}</dl>
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

export default CustomersTableField;
