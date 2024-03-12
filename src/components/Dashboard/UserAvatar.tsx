'use client';
import useFetchLogout from '@/requests/queries/authQueries/getLogout';
import useUserStore from '@/stores/useAuthStore';
import { formatName } from '@/utils/hacks/formatName';
import { Menu, Transition } from '@headlessui/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import React, { Fragment } from 'react';
import { CgProfile } from 'react-icons/cg';
import {
  MdOutlineDevices,
  MdOutlineAppRegistration,
  MdSecurity,
  MdExitToApp,
} from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function UserAvatar() {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUserStore();
  const { mutateAsync } = useFetchLogout();
  const userNavigation = [
    /* { name: 'Perfil', href: '/', icon: CgProfile,  current: true }, */
 /*    { name: 'Sessões', href: '#', icon: MdOutlineDevices, current: false }, */
    { name: 'Apps', href: '#', icon: MdOutlineAppRegistration, current: false },
    /* { name: 'Acessos', href: '#', icon: RiUserAddLine, current: false },
    { name: 'Segurança', href: '#', icon: MdSecurity, current: false }, */
  ];

  const logOut = async () => {
    destroyCookie(null, '@NEXTION_TOKEN', {
      path: `/`,
    });
    await mutateAsync();
    localStorage.clear()
    router.push(`/${locale}/auth/login`);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <div className="flex justify-center items-center rounded-full bg-green-400 px-4 py-3 h-[50px] w-[50px]">
          <p className="font-bold text-2xl">{user && user.user.name.slice(0,1)}</p>
        </div>
        <span className="hidden lg:flex lg:items-center">
          <span
            className="mx-5 text-base font-bold leading-6 text-white-100"
            aria-hidden="true"
          >
            {user && formatName(user.user.name)}
          </span>
        </span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-[30px] bg-green-200 py-4 shadow-lg pl-4 space-y-4">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(
                    active ? 'text-green-100' : '',
                    'px-3 py-1 text-base leading-6 text-white-100 font-medium flex gap-x-3 items-center hover:text-green-100'
                  )}
                >
                  <item.icon
                    size={22}
                    className=" shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <span
              className="px-3 py-1 text-base leading-6 text-white-100 hover:text-red-300 font-medium flex gap-x-3 items-center cursor-pointer"
              onClick={logOut}
            >
              <MdExitToApp size={22} className=" shrink-0" aria-hidden="true" />
              Sair
            </span>

          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default UserAvatar;
