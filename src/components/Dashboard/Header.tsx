'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IoWallet } from 'react-icons/io5';
import { IoWalletOutline } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { Button } from '../Global/Button';
import Spinner from '../Global/Spinner';
import UserAvatar from './UserAvatar';
import CompaniesDropdown from './CompaniesDropdown';
import MobileUserAmount from './Mobile/MobileAmount';
import MobileCompaniesDropdown from './Mobile/MobileCompaniesDropdown';
import useUserStore from '@/stores/useAuthStore';
import useFetchCurrent from '@/requests/queries/authQueries/getCurrent';
import { parseCookies } from 'nookies';

interface Props {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setSidebarOpen }: Props) => {
  const { user } = useUserStore();
  const t = useTranslations('Home');
  const { '@NEXTION_TOKEN': token } = parseCookies();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { data: user } = useFetchCurrent(token as string);
  const [toAppear, setToAppear] = useState({
    border: '',
    color: 'white',
    opacity: '0',
  });
  const { setUser } = useUserStore();

  const handleOpenDropdown = (type: string) => {
    if (isDropdownOpen === type) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(type);
    }
  };

  const handleToAppear = async () => {
    await setToAppear((prevToAppear) => {
      const newToAppear =
        prevToAppear.color === 'white'
          ? { border: 'border', color: 'green', opacity: '1' }
          : { border: '0', color: 'white', opacity: '0' };

      localStorage.setItem('headerState', JSON.stringify(newToAppear));
      return newToAppear;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const headerStyle = JSON.parse(
        localStorage.getItem('headerState') ||
          '{"border": "", "color": "white", "opacity": "0", "bg": "transparent"}',
      );
      setToAppear(headerStyle);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (user?.data) {
  //     setUser(user?.data);
  //   }
  // }, [setUser, user?.data]);

  return (
    <>
      <div className="flex shrink-0 items-center justify-end gap-x-4 bg-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 h-[80px]">
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center xl:pl-8">
          <button
            type="button"
            className="text-white-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenuAlt3 className="h-8 w-8" aria-hidden="true" />
          </button>
          {user?.user?.kyc_status === 'approved' && (
            <MobileCompaniesDropdown
              open={isDropdownOpen === 'companies'}
              setOpen={() => handleOpenDropdown('companies')}
            />
          )}
          {user?.user?.has_company && (
            <MobileUserAmount
              open={isDropdownOpen === 'userAmount'}
              setOpen={() => handleOpenDropdown('userAmount')}
            />
          )}
          {!isLoading ? (
            <div
              className={`hidden xl:flex text-white-100 w-full xl:w-[30%] justify-center xl:justify-between items-center px-5 ${toAppear.border} border-green-50 rounded-[15px] py-1.5`}
            >
              {user?.user?.has_company && (
                <div onClick={handleToAppear}>
                  {toAppear.opacity === '1' && (
                    <IoWallet
                      className={`w-6 h-6 text-green-50 cursor-pointer`}
                    />
                  )}
                  {toAppear.opacity === '0' && (
                    <IoWalletOutline
                      className={`w-6 h-6 text-white-50 cursor-pointer`}
                    />
                  )}
                </div>
              )}
              <div className={`opacity-${toAppear.opacity}`}>
                <Button variant="fifth" size="87px" h="29px">
                  <span className="text-white-50 font-medium text-sm">
                    Sacar
                  </span>
                </Button>
              </div>
              <div className={`flex flex-col opacity-${toAppear.opacity}`}>
                <p className="text-sm font-medium text-green-100">
                  {t('balanceAvailable')}
                </p>
                <p className="text-xl font-bold">R$ 12.000,00</p>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {user?.user?.kyc_status === 'approved' && <CompaniesDropdown />}
            <UserAvatar />
          </div>
        </div>
      </div>
    </>
  );
};
