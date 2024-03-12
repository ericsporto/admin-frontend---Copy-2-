import { Button } from '@/components/Global/Button';
import { Menu, Transition } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl';
import React, { Fragment, useEffect, useState } from 'react';
import { CustomInput } from '../Global/CustomInput';
import { BiAddToQueue } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import { MdArrowDropDown } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import Spinner from '../Global/Spinner';
import { CompaniesDropdownModel } from '@/interfaces/companiesInterfaces/companies';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import { handleName } from '@/utils/hacks/nameInitial';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function CompaniesDropdown() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: companies, isLoading } = useFetchCompaniesDropdown(search);

  const handleItemClick = async (id: string) => {
    const payload = {
      company_id: id,
    };
    await api.post(`/admin/companies/selected`, payload);
    queryClient.invalidateQueries({ queryKey: ['companies-dropdown'] });
  };

  const handleRedirect = () => {
    setIsDropdownOpen(false);
    router.push(`/${locale}/companies/companyRegister`);
  };

  return (
    <Menu as="div" className="relative hidden xl:flex">
      {({ close }) => (
        <>
          <Menu.Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={classNames(
              isDropdownOpen
                ? 'border border-green-50 '
                : 'border border-green-300',
              'flex items-center text-left justify-between hover:border-green-50 text-gray-50 hover:text-green-50 rounded-[10px] w-[231px] p-2 ease-in duration-200',
            )}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="pl-2">
                <div className="flex items-center gap-2 w-full">
                  {companies?.length !== 0 ? (
                    <>
                      <div className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
                        {companies && handleName(companies[0]?.business_name)}
                      </div>
                      <div>
                        <p className="text-white-50 text-[13px] font-medium">
                          {companies && companies[0]?.business_name}
                        </p>
                        <p className="text-gray-50 text-[11px] font-light">
                          {companies &&
                            formatCnpjCpf(companies[0]?.official_id_number)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-white-50 text-[13px] font-medium">
                      Nenhuma empresa
                    </p>
                  )}
                </div>
              </div>
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
            <Menu.Items className="absolute -right-2.5 top-14 z-10 w-[250px] rounded-[20px] bg-green-200 shadow-lg flex flex-col justify-center items-start space-y-4 px-5 max-h-[375px] overflow-hidden pb-4">
              <div className="flex flex-col justify-center items-center gap-6 pt-6">
                <Button
                  onClick={() => {
                    handleRedirect(), close();
                  }}
                  type="button"
                  size="210px"
                  h="40px"
                >
                  <BiAddToQueue className="h-6 w-6" />
                  <span className="font-bold text-base">Criar Empresa</span>
                </Button>
                <CustomInput
                  type="text"
                  h="40px"
                  onChange={(e) => setSearch(e.target.value)}
                  iconPosition="left"
                  placeholder="Buscar empresa"
                  icon={<CgSearch size={24} />}
                  textColor="white"
                />
              </div>
              <div className="overflow-auto w-full flex flex-col justify-start items-center">
                {isLoading && <Spinner />}
                {companies?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        onClick={() => handleItemClick(item.id)}
                        className="flex items-center gap-2 w-full mt-2 cursor-pointer"
                      >
                        <div className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px]">
                          CE
                        </div>
                        <div>
                          <p className="text-white-50 text-[13px] font-medium">
                            {item.business_name}
                          </p>
                          <p className="text-gray-50 text-[11px] font-light">
                            {formatCnpjCpf(item.official_id_number)}
                          </p>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default CompaniesDropdown;
