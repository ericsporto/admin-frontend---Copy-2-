import { Button } from '@/components/Global/Button';
import { Menu, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { IoWallet, IoWalletOutline } from 'react-icons/io5';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface MobileUserAmountProps {
  open: boolean;
  setOpen: (type: string) => void;
}

const MobileUserAmount: React.FC<MobileUserAmountProps> = ({
  open,
  setOpen,
}) => {
  const t = useTranslations('Home');

  const userAmount = [{ name: t('balanceAvailable'), amount: 'R$12.000,00' }];

  return (
    <Menu as="div" className="relative xl:hidden">
      <div
        className={classNames(
          open ? ' bg-green-200' : 'bg-transparent',
          'flex items-center justify-center w-11 h-11 rounded-[10px]'
        )}
      >
        <Menu.Button
          onClick={() => setOpen('userAmount')}
          className="flex items-center"
        >
          <div className="xl:hidden">
            {open && (
              <IoWallet size={24} className="cursor-pointer text-green-50" />
            )}
            {!open && (
              <IoWalletOutline
                size={24}
                className="cursor-pointer text-white-50"
              />
            )}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -left-[60px] top-9 z-10 w-[165px] rounded-[20px] bg-gray-200 shadow-xl flex flex-col justify-center items-start space-y-4 px-5 border border-green-50">
          <div className="pt-6">
            <Button variant="fifth" size="125px" h="29px">
              <span className="text-white-50 font-medium text-sm">Sacar</span>
            </Button>
          </div>
          {userAmount.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <div className="flex justify-center items-start w-full pb-4">
                  <div className="flex flex-col w-full justify-center items-center text-left">
                    <p className="text-sm font-medium text-green-100 ">
                      {item.name}
                    </p>
                    <p className="text-xl font-bold text-white-50">
                      {item.amount}
                    </p>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MobileUserAmount;
