import React from 'react';
import SalesRecoveryCard from './SalesRecoveryCard';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const SalesRecoveryCardField: React.FC = () => {
  const paginate = ['1', '2', '3', '4', '10'];

  const mockObject = [
    {
      id: '1',
      name: 'Client Example',
      email: 'client@example.com',
      paymentValue: 'R$160,00',
      status: 'Recuperado',
      emailQuantity: '2 enviados',
      smsQuantity: '2 enviados',
    },
    {
      id: '2',
      name: 'Client Example',
      email: 'client@example.com',
      paymentValue: 'R$160,00',
      status: 'Não recuperado',
      emailQuantity: '2 enviados',
      smsQuantity: '2 enviados',
    },
  ];
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-8 space-y-3">
      {mockObject.map((item, index) => (
        <SalesRecoveryCard
          key={index}
          name={item.name}
          email={item.email}
          paymentValue={item.paymentValue}
          status={item.status}
          emailQuantity={item.emailQuantity}
          smsQuantity={item.smsQuantity}
        />
      ))}
      <div className="flex w-full my-3 justify-center px-8">
        {paginate.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'flex justify-center items-center rounded-[10px] p-3 w-10 text-[13px] font-medium text-white-50 cursor-pointer',
              item === '1'
                ? 'bg-green-50'
                : 'bg-gray-900 hover:bg-gray-800 transition-all ease-in-out'
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesRecoveryCardField;
