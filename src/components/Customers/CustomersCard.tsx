import { editDateWithHours } from '@/utils/hacks/editDate';
import { handleName } from '@/utils/hacks/nameInitial';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

interface CardProps {
  name: string;
  email: string;
  document: string;
  createDate: string;
  id: string;
}

const CustomersCard = (props: CardProps) => {
  const locale = useLocale();
  const router = useRouter();

  const handleRedirect = async () => {
    router.push(`/${locale}/customers/${props.id}`);
  };
  return (
    <>
      <div
        onClick={handleRedirect}
        className="w-full h-[160px] flex flex-col border p-2 border-gray-50 rounded-[10px] justify-between"
      >
        <div className="flex items-center text-left gap-2">
          <div className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
            {props.name && handleName(props.name)}
          </div>
          <div>
            <p className="text-white-50 text-[15px] font-medium">
              {props.name}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-1">
            <p className="text-gray-50 text-sm font-medium">E-mail:</p>
            <p className="text-white-50 text-sm font-medium">{props.email}</p>
          </div>
          <div className="flex gap-1">
            <p className="text-gray-50 text-sm font-medium">CPF/CNPJ:</p>
            <p className="text-white-50 text-sm font-medium">
              {props.document}
            </p>
          </div>
          <div className="flex gap-1">
            <p className="text-gray-50 text-sm font-medium">Data de criação:</p>
            <p className="text-white-50 text-sm font-medium">
              {editDateWithHours(props.createDate)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersCard;
