'use client';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { IoMdArrowDropleft } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { CgSearch } from 'react-icons/cg';
import { CustomInput } from '@/components/Global/CustomInput';
import { BiCategory } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

type MethodsModel = {
  id: number;
  name: string;
  icon: IconType;
};

interface DropdownProps {
  methods: MethodsModel[];
  method: string;
  setMethod: (color: string) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const PaymentMethodDropdown: React.FC<DropdownProps> = ({
  methods,
  method,
  setMethod,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Menu as="div" className="relative w-full">
      {({ close }) => (
        <>
          <div className="flex items-center gap-1 pb-2">
            <p className="text-white-50 text-base font-medium">Cor</p>
            <span className="text-gray-50 text-sm font-medium">(opcional)</span>
          </div>
          <Menu.Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={classNames(
              isDropdownOpen
                ? 'border border-green-50 '
                : 'border border-gray-50',
              'flex items-center text-left justify-between hover:border-green-50 text-gray-50 hover:text-green-50 rounded-[10px] w-full py-2 px-4 ease-in duration-200',
            )}
          >
            {method ? (
              <div className="flex items-center gap-2 py-0.5">
                <p className="text-sm font-medium text-green-50">
                  {methods.find((c) => c.name === method)?.name}
                </p>
              </div>
            ) : (
              <p className="text-white-100 font-medium">Selecione</p>
            )}
            {!isDropdownOpen && (
              <MdArrowDropDown size={20} className="rotate-90" />
            )}
            {isDropdownOpen && (
              <MdArrowDropDown size={20} className="text-green-50" />
            )}
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
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-full  origin-top-right rounded-[10px] bg-green-200 py-4 shadow-lg px-4 space-y-4">
              {methods?.map((item) => (
                <Menu.Item key={item.name}>
                  <div
                    onClick={() => {
                      setMethod(item.name), close();
                    }}
                    className="flex items-center gap-2 cursor-pointer text-white-50 hover:text-green-50"
                  >
                    <item.icon
                      size={24}
                      className=" shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium">{item?.name}</p>
                  </div>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default PaymentMethodDropdown;
