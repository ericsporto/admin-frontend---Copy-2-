'use client';
import { colors } from '@/utils/objects/colors';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export interface ColorsDropdownProps {
  color: string;
  setColor: (color: string) => void;
}

const ColorsDropdown: React.FC<ColorsDropdownProps> = ({ color, setColor }) => {
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
              'flex items-center text-left justify-between hover:border-green-50 text-gray-50 hover:text-green-50 rounded-[10px] w-full py-2 px-4 ease-in duration-200'
            )}
          >
            {color ? (
              <div className='flex items-center gap-2 py-0.5'>
                <p
                  className="rounded-full w-[10px] h-[10px]"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm font-medium">
                  {colors.find((c) => c.code === color)?.name}
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
              {colors?.map((item) => (
                <Menu.Item key={item.name}>
                  <div
                    onClick={() => {
                      setColor(item.code), close();
                    }}
                    className="flex items-center gap-2 cursor-pointer text-white-50 hover:text-green-50"
                  >
                    <span
                      className="rounded-full w-[10px] h-[10px]"
                      style={{ backgroundColor: `${item.code}` }}
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

export default ColorsDropdown;
