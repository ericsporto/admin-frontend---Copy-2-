'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import Spinner from '../../Global/Spinner';
import useFetchStoreById from '@/requests/queries/storesQueries/getStoreById';
import { handleName } from '@/utils/hacks/nameInitial';
import { HiPencilAlt } from 'react-icons/hi';
import { TiTrash } from 'react-icons/ti';
import { BiCategory } from 'react-icons/bi';
import {
  FaCartArrowDown,
  FaCashRegister,
  FaTrashRestore,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenUpdateModal: (openUpdateModal: boolean) => void;
  id: string;
  status: boolean;
}

const StoreDetailModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  setOpenUpdateModal,
  id,
  status,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const { data: store } = useFetchStoreById(id);
  const router = useRouter();
  const locale = useLocale();

  const deleteStore = async () => {
    setIsLoading(true);

    try {
      await api.delete(`/admin/stores/${id}`);
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      showSuccess('Loja inativada com sucesso!');
      setIsLoading(false);
      setOpen(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center text-center p-2 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-[20px] bg-green-300 p-4 pb-4 text-left overflow-hidden shadow-xl transition-all sm:my-8 w-full sm:max-w-[704px] sm:p-2">
                <div className="max-h-[550px] xl:max-h-[800px] overflow-y-auto p-2 sm:p-5">
                  <div className="text-left text-white-50">
                    <Dialog.Title
                      as="h3"
                      className="text-lg xl:text-xl font-medium leading-6 "
                    >
                      Detalhes da loja
                    </Dialog.Title>
                    <div className="flex items-center text-left gap-2 mt-5">
                      <div className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px]">
                        {store?.data?.name && handleName(store?.data?.name)}
                      </div>
                      <div>
                        <p className="text-white-50 text-xs font-medium">
                          {store?.data?.name}
                        </p>
                        <p className="text-gray-50 text-[10px] font-light">
                          {store?.data?.support_email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 gap-2">
                    <Button
                      onClick={() => {
                        setOpen(false), setOpenUpdateModal(true);
                      }}
                      size="350px"
                      type="button"
                      variant="fifth"
                    >
                      <HiPencilAlt size={22} />
                      <span className="text-base font-medium text-white-50">
                        Editar
                      </span>
                    </Button>
                    {status && (
                      <Button
                        onClick={deleteStore}
                        size="350px"
                        type="button"
                        variant="sixth"
                      >
                        <TiTrash size={22} />
                        <span className="text-base font-medium">
                          {isLoading ? <Spinner /> : 'Excluir'}
                        </span>
                      </Button>
                    )}
                    {!status && (
                      <Button
                        onClick={deleteStore}
                        size="350px"
                        type="button"
                        variant="primary"
                      >
                        <FaTrashRestore size={22} />
                        <span className="text-base font-medium">
                          {isLoading ? <Spinner /> : 'Reativar?'}
                        </span>
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between mt-3 gap-2">
                    <Button
                      onClick={() => {
                        router.push(`/${locale}/stores/${id}/categories`),
                          setOpen(false);
                      }}
                      size="350px"
                      type="button"
                      variant="fifth"
                    >
                      <BiCategory size={22} />
                      <span className="text-base font-medium text-white-50">
                        Categorias
                      </span>
                    </Button>
                    <Button
                      onClick={() => {
                        router.push(`/${locale}/stores/${id}/products`),
                          setOpen(false);
                      }}
                      size="350px"
                      type="button"
                      variant="fifth"
                    >
                      <FaCartArrowDown size={22} />
                      <span className="text-base font-medium text-white-50">
                        Produtos
                      </span>
                    </Button>
                  </div>
                  <div className="flex justify-center mt-3">
                    <Button size="317px" type="button" variant="fifth">
                      <FaCashRegister size={22} />
                      <span className="text-base font-medium text-white-50">
                        Ver vendas
                      </span>
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StoreDetailModal;
