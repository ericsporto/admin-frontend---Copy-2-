import { CustomTd } from '../../Global/Table/CustomTd';

import { TransactionsByCustomer } from '@/interfaces/customersInterfaces/customers';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { statusTranslate } from '@/utils/hacks/statusTranslate';
import { formatCurrency } from '@/utils/hacks/formatNumbers';

interface TableFieldProps {
  item: TransactionsByCustomer;
}

const CustomersTransactionsTableField: React.FC<TableFieldProps> = ({
  item,
}) => {
  const router = useRouter();
  const locale = useLocale();

  const handleRedirect = async () => {
    router.push(`/${locale}/customers/${item.id}`);
  };
  return (
    <>
      <tr className="cursor-pointer hover:opacity-50" onClick={handleRedirect}>
        <CustomTd variant="roundedLeft">
          <dl className="flex items-center text-left gap-1 xl:gap-2">
            <dl
              className="flex justify-center items-center rounded-[10px] w-[35px] h-[35px]"
              style={{
                backgroundImage: `url(/images/pix-icon.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }}
            ></dl>
            <dl>
              <dl className="text-white-50 text-[13px] font-medium">
                {locale === 'en' ? '$' : 'R$'} {' '}
                {formatCurrency(
                  item?.total_price_with_shipping.toString(),
                  locale,
                )}
              </dl>
              <dl className="text-gray-50 text-[11px] font-light">À vista</dl>
            </dl>
          </dl>
        </CustomTd>
        <CustomTd>
          <dl className="text-gray-50 text-xs font-medium">
            {item?.products[0]?.name}
          </dl>
        </CustomTd>
        <CustomTd variant="roundedRight">
          {(item.status === 'payment_received' ||
            item.status === 'completed') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
          {(item.status === 'awaiting_payment' ||
            item.status === 'open_dispute') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-yellow-100 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
          {(item.status === 'cancelled' || item.status === 'expired') && (
            <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 h-5 text-xs font-medium text-white-50">
              {statusTranslate(item.status)}
            </span>
          )}
        </CustomTd>
      </tr>
    </>
  );
};

export default CustomersTransactionsTableField;
