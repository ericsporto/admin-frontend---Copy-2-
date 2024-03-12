'use client';
import { CreditCardInstallmentFees } from '@/interfaces/companiesInterfaces/companies';
import { formatCurrency } from '@/utils/hacks/formatNumbers';
import { Menu, Transition } from '@headlessui/react';
import { useLocale } from 'next-intl';
import React, { Fragment } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface DropdownProps {
  installments?: CreditCardInstallmentFees[];
}

const TaxDropdown: React.FC<DropdownProps> = ({ installments }) => {
  const locale = useLocale();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex justify-start items-start w-full">
        <p className="text-base font-light text-white-50 px-3 text-left">
          Clique aqui para visualizar as taxas por parcela.
        </p>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-5 xl:-right-20 -top-72 z-10 mt-2.5 w-48 h-[370px] origin-top-right rounded-[20px] bg-green-200 py-4 pl-2 pr-2 shadow-lg overflow-hidden">
          <div className="overflow-auto w-full flex flex-col space-y-4 h-[340px] pr-2">
            {installments?.map((item, index) => (
              <Menu.Item key={index}>
                <div className="flex justify-between border border-green-50 p-4 rounded-[20px]">
                  <p className='text-white-50 font-medium'>{item.installment}x</p>
                  <p className='text-green-50 font-bold'>{formatCurrency(item.value.toString(), locale)}%</p>
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TaxDropdown;
