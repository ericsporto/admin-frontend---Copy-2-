'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import Spinner from '../../Global/Spinner';
import { HiPencilAlt } from 'react-icons/hi';
import { TiTrash } from 'react-icons/ti';
import { BiCategory } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import useFetchCategoryById from '@/requests/queries/categoriesQueries/getCategoryById';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenUpdateModal: (openUpdateModal: boolean) => void;
  id: string;
  store_uuid: string;
}

const CategoryDetailModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  setOpenUpdateModal,
  id,
  store_uuid,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const { data: category } = useFetchCategoryById(store_uuid, id);
  const router = useRouter();
  const locale = useLocale();

  const deleteCategory = async () => {
    setIsLoading(true);

    try {
      await api.delete(`/admin/stores/${store_uuid}/categories/${id}`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showSuccess('Categoria excluída com sucesso!');
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
                      Detalhes da categoria
                    </Dialog.Title>
                    <div className="flex items-center text-left gap-2 mt-5">
                      <div className="flex justify-start items-center px-3 rounded-[10px] text-green-50 font-medium text-[15px] border border-green-50 gap-3 w-full h-[54px]">
                        <BiCategory size={18}/>
                        {category?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 gap-3">
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
                      <Button
                        onClick={deleteCategory}
                        size="350px"
                        type="button"
                        variant="sixth"
                      >
                        <TiTrash size={22} />
                        <span className="text-base font-medium">
                          {isLoading ? <Spinner /> : 'Excluir'}
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

export default CategoryDetailModal;
