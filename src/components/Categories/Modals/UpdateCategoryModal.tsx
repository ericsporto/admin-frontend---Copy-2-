'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterStoresCreadentials } from '@/interfaces/storesInterfaces/stores';
import { storeRegisterSchema } from '@/utils/schemas/schemas';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import Spinner from '../../Global/Spinner';
import useFetchStoreById from '@/requests/queries/storesQueries/getStoreById';
import useFetchCategoryById from '@/requests/queries/categoriesQueries/getCategoryById';
import { RegisterCategoriesCreadentials } from '@/interfaces/categoriesInterfaces/categories';
import CustomSelect from '@/components/Global/CustomSelect';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  store_uuid: string;
}

const UpdateCategoryModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  id,
  store_uuid,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const { data: category } = useFetchCategoryById(store_uuid, id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCategoriesCreadentials>();

  const onSubmit = async (data: RegisterCategoriesCreadentials) => {
    setIsLoading(true);
    const payload = {
      ...data,
      is_active: data.is_active ? true : false
    };
    try {
      const response = await api.put(`/admin/stores/${store_uuid}/categories/${id}`, payload);
      if (response?.data) {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        showSuccess('Categoria editada com sucesso!');
        setIsLoading(false);
        setOpen(false);
      }
    } catch {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        Editar categoria
                      </Dialog.Title>
                      <p className="text-xs xl:text-base font-light">
                        Defina nome, descrição, loja e status.
                      </p>
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        defaultValue={category?.name}
                        type="text"
                        label="Nome da loja*"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        h="40px"
                        register={register('name')}
                        errorType={errors.name}
                        messageError={errors.name?.message}
                      />
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        defaultValue={category?.description}
                        type="text"
                        label="E-mail*"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        h="40px"
                        register={register('description')}
                      />
                    </div>
                    <div className="mt-4">
                      {category?.is_active && (
                        <CustomSelect
                          defaultValue={category?.is_active ? 1 : 0}
                          label="Status*"
                          labelFontSize="14px"
                          textColor="white"
                          h="40px"
                          register={register('is_active')}
                        >
                          <option value={1}>Ativo</option>
                          <option value={0}>Inativo</option>
                        </CustomSelect>
                      )}
                      {!category?.is_active && (
                        <CustomSelect
                          defaultValue={category?.is_active ? 1 : 0}
                          label="Status*"
                          labelFontSize="14px"
                          textColor="white"
                          h="40px"
                          register={register('is_active')}
                        >
                          <option value={0}>Inativo</option>
                          <option value={1}>Ativo</option>
                        </CustomSelect>
                      )}
                    </div>
                    <div className="flex flex-col justify-center xl:justify-end items-center xl:items-end mt-5">
                      <Button size="300px" type="submit" variant="primary">
                        <span className="text-base font-bold text-white-50">
                          {isLoading ? <Spinner /> : 'Salvar'}
                        </span>
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateCategoryModal;
