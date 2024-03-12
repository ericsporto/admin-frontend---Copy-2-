'use client';
import { MdSpaceDashboard, MdPendingActions } from 'react-icons/md';
import { RiSettings3Fill } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { FaCreditCard, FaLink, FaCoins } from 'react-icons/fa';
import { GrTechnology } from 'react-icons/gr';
import { BsPenFill } from 'react-icons/bs';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoStorefront } from 'react-icons/io5';
import useFetchCurrent from '@/requests/queries/authQueries/getCurrent';
import useUserStore from '@/stores/useAuthStore';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function DesktopSideBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const {user} =  useUserStore()
  const [showSale, setShowSale] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);

  const has_company = user?.user.has_company

  const salesNavigation = [
    { name: 'Transações', href: `/${locale}/sales/transactions` },
   /*  { name: 'Recuperação', href: `/${locale}/sales/salesRecovery` }, */
    /* { name: 'Rastreamento', href: '#' }, */
    /* { name: 'Contestações', href: '#' }, */
  ];
  const navigation = [
    { name: 'Lojas', href: `/${locale}/stores`, icon: IoStorefront },
    { name: 'Clientes', href: `/${locale}/customers`, icon: HiUserGroup },
    { name: 'Saques', href: `/${locale}/withdrawal`, icon: FaCoins },
  ];
  const configurationsNavigation = [
    { name: 'Empresa', href: `/${locale}/configurations/companyConfig` },
    { name: 'Taxas e pagamentos', href: `/${locale}/configurations/taxAndPayments` },
    /* { name: 'Credenciais de API' }, */
    /* { name: 'Webhooks', href: '#' }, */
    /* { name: 'Segurança', href: '#' }, */
  ];

  const handleExpandSale = () => {
    setShowSale((previous: boolean) => !previous);
  };
  const handleExpandConfiguration = () => {
    setShowConfiguration((previous: boolean) => !previous);
  };



  return (
    <div className="hidden lg:flex lg:w-[317px] lg:flex-col h-full">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-green-200 pb-4">
        <div className="w-full flex justify-center mt-[116px]">
          <Image
            width={162}
            height={64}
            className=""
            src="/images/logo-image-white.svg"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col mt-8 pl-8">
          <ul role="list" className="-mx-2 space-y-1">
            <li>
              <a
                href={`/${locale}`}
                className={classNames(
                  `/${locale}` === pathname
                    ? 'bg-green-300 text-green-100 py-3.5 pl-6 text-base leading-6 font-medium flex items-center'
                    : 'text-white-100 hover:text-green-100 hover:bg-green-300',
                  'group gap-x-3 rounded-s-[20px] py-3.5 pl-6 text-base leading-6 font-medium flex items-center',
                )}
              >
                <MdSpaceDashboard
                  size={24}
                  className=" shrink-0"
                  aria-hidden="true"
                />
                Início
              </a>
            </li>
            <li className={user?.user?.has_company ? 'block' : 'hidden'}>
                <button
                  onClick={handleExpandSale}
                  className={classNames(
                    `/${locale}/` === pathname
                      ? 'bg-green-300 text-green-100 py-3.5 pl-6 text-base leading-6 font-medium flex items-center w-full'
                      : 'text-white-100 hover:text-green-100 hover:bg-green-300 w-full',
                    'group gap-x-3 rounded-s-[20px] py-3.5 pl-6 text-base leading-6 font-medium flex items-center',
                  )}
                >
                  <FaCreditCard
                    size={24}
                    className=" shrink-0"
                    aria-hidden="true"
                  />
                  Vendas
                </button>
              </li>
            <li>
              <div
                className={classNames(
                  'transition-transform duration-500 ease-in-out pl-6',
                  !showSale ? 'hidden' : 'block',
                )}
              >
                <ul>
                  {salesNavigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.href === pathname
                            ? 'bg-green-300 text-green-100 py-2.5 pl-6 text-[15px] leading-6 font-medium flex items-center'
                            : 'text-white-100 hover:text-green-100 hover:bg-green-300',
                          'group gap-x-3 rounded-s-[20px] py-2.5 pl-6 text-[15px] leading-6 font-medium flex items-center',
                        )}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>
            </li>
            {navigation.map((item) => (
              <li
                className={user?.user?.has_company ? 'block' : 'hidden'}
                key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-green-300 text-green-100 py-3.5 pl-6 text-base leading-6 font-medium flex items-center'
                      : 'text-white-100 hover:text-green-100 hover:bg-green-300',
                    'group gap-x-3 rounded-s-[20px] py-3.5 pl-6 text-base leading-6 font-medium flex items-center',
                  )}
                >
                  <item.icon
                    size={24}
                    className=" shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </li>
            ))}
            <li className={user?.user?.has_company ? 'block' : 'hidden'}>
              <button
                onClick={handleExpandConfiguration}
                className={classNames(
                  `/${locale}/` === pathname
                    ? 'bg-green-300 text-green-100 py-3.5 pl-6 text-base leading-6 font-medium flex items-center w-full'
                    : 'text-white-100 hover:text-green-100 hover:bg-green-300 w-full',
                  'group gap-x-3 rounded-s-[20px] py-3.5 pl-6 text-base leading-6 font-medium flex items-center',
                )}
              >
                <FaCreditCard
                  size={24}
                  className=" shrink-0"
                  aria-hidden="true"
                />
                Configurações
              </button>
            </li>
            <li>
            <div
              className={classNames(
                'transition-transform duration-500 ease-in-out pl-6',
                !showConfiguration ? 'hidden' : 'block',
              )}
            >
                <ul>
                {configurationsNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? 'bg-green-300 text-green-100 py-2.5 pl-6 text-[15px] leading-6 font-medium flex items-center'
                          : 'text-white-100 hover:text-green-100 hover:bg-green-300',
                        'group gap-x-3 rounded-s-[20px] py-2.5 pl-6 text-[15px] leading-6 font-medium flex items-center',
                      )}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                </ul>
            </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DesktopSideBar;
