import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MdSpaceDashboard, MdPendingActions } from 'react-icons/md';
import { RiSettings3Fill } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { FaCreditCard, FaLink, FaCoins } from 'react-icons/fa';
import { GrTechnology } from 'react-icons/gr';
import { BsPenFill } from 'react-icons/bs';
import Image from 'next/image';
import DesktopSideBar from '../DesktopSideBar';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { IoStorefront } from 'react-icons/io5';
import useUserStore from '@/stores/useAuthStore';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const {user} =  useUserStore()
  const [showSale, setShowSale] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const salesNavigation = [
    { name: 'Transações', href: `/${locale}/sales/transactions` },
    /* { name: 'Recuperação', href: `/${locale}/sales/salesRecovery` }, */
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
    {
      name: 'Taxas e pagamentos',
      href: `/${locale}/configurations/taxAndPayments`,
    },
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
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-[75%] -top-4 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-4.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white-100"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-green-200 pb-4">
                    <div className="w-full flex justify-center mt-10">
                      <Image
                        width={163}
                        height={68}
                        className="h-12 w-auto"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <DesktopSideBar />
      </div>
    </>
  );
}
