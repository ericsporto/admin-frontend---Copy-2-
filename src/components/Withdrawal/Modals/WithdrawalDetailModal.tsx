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
import { CgFileDocument } from 'react-icons/cg';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const WithdrawalDetailModal: React.FC<ModalProps> = ({ open, setOpen, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();

  /* const deleteStore = async () => {
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
  }; */

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
                      Detalhes do saque
                    </Dialog.Title>
                    <div className="flex flex-col border border-green-50 p-6 justify-start mt-4 rounded-[20px]">
                      <p className="text-green-50 text-xl font-medium">
                        Recebedor da transferência
                      </p>
                      <div className="flex items-center text-left gap-2 mt-1">
                        <div className="flex justify-center items-center rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px] w-[35px] h-[35px]">
                          CN
                        </div>
                        <div>
                          <p className="text-white-50 text-[13px] font-medium">
                            COMPANY NAME
                          </p>
                          <p className="text-gray-50 text-[11px] font-light">
                            00000000/0000-00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col border border-green-50 p-6 justify-start mt-4 rounded-[20px]">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <h2 className="text-green-50 text-base font-medium">
                            Valor transferido
                          </h2>
                          <h1 className=" text-white-50 text-2xl font-bold">
                            {/*  {locale === 'en' ? '$' : 'R$'}{' '}
                    {formatCurrency(
                      sale?.total_price_with_shipping.toString(),
                      locale,
                    )} */}
                            R$4.000,00
                          </h1>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <h3 className="text-gray-50 text-sm font-medium">
                            Status
                          </h3>
                          <div className="mt-1 xl:mt-0">
                            <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
                              Aprovado
                            </span>
                            {/*  {(sale?.status === 'payment_received' ||
                      sale?.status === 'completed') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )} */}
                            {/*  {(sale?.status === 'awaiting_payment' ||
                      sale?.status === 'open_dispute') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-yellow-100 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )}
                    {(sale?.status === 'cancelled' ||
                      sale?.status === 'expired') && (
                      <span className="flex items-center w-fit justify-center rounded-[10px] bg-red-100 px-2.5 h-5 text-xs font-medium text-white-50">
                        {statusTranslate(sale.status)}
                      </span>
                    )} */}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mt-8">
                        <div className="flex flex-col items-start w-36 break-all">
                          <p className="flex items-end text-gray-50 text-sm font-medium">
                            ID Transação
                          </p>
                          <h1 className="text-white-50 text-base font-medium">
                            #00000000000
                          </h1>
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="flex items-end text-gray-50 text-sm font-medium">
                            Taxa da transferência
                          </p>
                          <h1 className="text-white-50 text-base font-medium">
                            R$70,00
                          </h1>
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="flex items-end text-gray-50 text-sm font-medium">
                            Data de criação
                          </p>
                          <h1 className="text-white-50 text-base font-medium">
                            {/* {editDateWithHours(sale?.created_at)} */}
                            26 Dez. 2023 14:00
                          </h1>
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="flex items-end text-gray-50 text-sm font-medium">
                            Transferido em
                          </p>
                          <h1 className="text-white-50 text-base font-medium">
                            {/* {editDateWithHours(sale?.payment.paid_at)} */}
                            26 Dez. 2023 14:00
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-end items-end mt-4">
                    <div className="flex w-full xl:w-[300px]">
                      <Button size="100%" type="button">
                        <CgFileDocument size={22} />
                        <span className="text-base font-medium text-white-50">
                          Ver comprovante
                        </span>
                      </Button>
                    </div>
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

export default WithdrawalDetailModal;
