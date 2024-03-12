'use client';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { IoMdArrowDropleft } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { CgSearch } from 'react-icons/cg';
import { CustomInput } from '@/components/Global/CustomInput';
import { BiCategory } from 'react-icons/bi';
import { CategoryDropdownModel } from '@/interfaces/categoriesInterfaces/categories';

interface CategoryDropdownProps {
  categories?: CategoryDropdownModel[] | null;
  currentCategory?: CategoryDropdownModel | null;
  setCurrentCategory: (category: CategoryDropdownModel) => void;
  search: string;
  setSearch: (search: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  currentCategory,
  setCurrentCategory,
  search,
  setSearch,
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={`flex items-center justify-between gap-2 px-[20px]  w-full py-2 rounded-[10px] border ${
          currentCategory ? 'border-green-100 ' : 'border-gray-50 '
        }`}
      >
        <div className="flex items-center gap-4">
          {!currentCategory ? (
            <>
              <BiCategory size={20} className="text-white-100" />{' '}
              <p className="text-white-100 font-medium">Selecionar categoria</p>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <BiCategory size={20} className="text-green-100" />
              <p className="text-green-100 font-medium">
                {currentCategory && currentCategory?.name}
              </p>
            </div>
          )}
        </div>

        {currentCategory ? (
          <IoMdArrowDropleft size={15} className="text-green-100" />
        ) : (
          <MdArrowDropDown size={15} className="text-white-100" />
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
          <CustomInput
            textColor="white"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            h="44px"
            iconPosition="left"
            icon={<CgSearch size={20} />}
            placeholder="Buscar categoria"
            type="search"
          />
          {categories?.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={() => setCurrentCategory(item)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <p className="text-white-100 font-medium">{item?.name}</p>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CategoryDropdown;
