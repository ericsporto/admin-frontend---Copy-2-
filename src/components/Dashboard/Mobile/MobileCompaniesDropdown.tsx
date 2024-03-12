import { Button } from '@/components/Global/Button';
import { Menu, Transition } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl';
import React, { Fragment, useState } from 'react';
import { CustomInput } from '../../Global/CustomInput';
import { BiAddToQueue } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import { IoIosBusiness } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';
import { formatCnpjCpf } from '@/utils/hacks/formatCpfOrCnpj';
import Spinner from '@/components/Global/Spinner';
import { handleName } from '@/utils/hacks/nameInitial';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface MobileCompaniesDropdownProps {
  open: boolean;
  setOpen: (type: string) => void;
}

const MobileCompaniesDropdown: React.FC<MobileCompaniesDropdownProps> = ({
  open,
  setOpen,
}) => {
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { data: companies, isLoading } = useFetchCompaniesDropdown(search);

    const handleItemClick = async (id: string) => {
      const payload = {
        company_id: id,
      };
      await api.post(`/admin/companies/selected`, payload);
      queryClient.invalidateQueries({ queryKey: ['companies-dropdown'] });
    };

  const handleRedirect = () => {
    setOpen('');
    router.push(`/${locale}/companies/companyRegister`);
  };

  return (
    <Menu as="div" className="relative xl:hidden">
      {({ close }) => (
        <>
          <div
            className={classNames(
              open ? ' bg-green-200' : 'bg-transparent',
              'flex items-center justify-center w-11 h-11 rounded-[10px]',
            )}
          >
            <Menu.Button
              onClick={() => setOpen('companies')}
              className={classNames(
                open ? 'text-green-50 ' : 'text-white-50',
                'h-6 w-6',
              )}
            >
              <div className="xl:hidden">
                <IoIosBusiness className=" w-6 h-6 cursor-pointer" />
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
            <Menu.Items className="absolute -right-[105px] top-9 z-10 w-[250px] rounded-[20px] bg-gray-200 shadow-xl flex flex-col justify-center items-start space-y-4 px-5 max-h-[450px] overflow-hidden border border-green-50">
              <div className="flex flex-col justify-start items-start gap-6 pt-6">
                {companies?.length !== 0 ? (
                  <div className="border border-green-50 p-2 w-full rounded-[10px]">
                    <div className="flex items-center gap-2 w-full">
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
                    </div>
                  </div>
                ) : (
                  <p className="text-white-50 text-[13px] font-medium">
                    Nenhuma empresa
                  </p>
                )}
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
                  iconPosition="left"
                  placeholder="Buscar empresa"
                  onChange={(e) => setSearch(e.target.value)}
                  icon={<CgSearch size={24} />}
                  textColor="white"
                />
              </div>
              <div className="overflow-auto w-full flex flex-col justify-center items-center">
                {isLoading && <Spinner />}
                {companies?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                      onClick={() => handleItemClick(item.id)}
                        className="flex items-center gap-2 w-full my-2"
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
};

export default MobileCompaniesDropdown;
