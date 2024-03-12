'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import useResponse from '@/hooks/useResponse';
import Spinner from '../Global/Spinner';

interface CreateTransactionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  company_uuid?: string | undefined;
  sale_uuid?: string;
  tracking_code?: string;
}

const InsertCodeDeliverModal: React.FC<CreateTransactionModalProps> = ({
  open,
  setOpen,
  company_uuid,
  sale_uuid,
  tracking_code,
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();

  const submit = async () => {
    setIsLoading(true);
    const payload = {
      tracking_code: code,
    };
    try {
      await api.post(
        `/admin/companies/${company_uuid}/sales/${sale_uuid}/delivery/shipped`,
        payload,
      );
      queryClient.invalidateQueries({ queryKey: ['sale-by-id'] });
      showSuccess('Código cadastrado com sucesso!');
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

        <div className="fixed inset-0 z-10 w-screen overflow-auto">
          <div className="flex min-h-full items-center justify-center px-2 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-[30px] bg-green-300 p-4 pb-4 text-left overflow-hidden shadow-xl transition-all sm:w-full sm:max-w-[704px] sm:p-2">
                <div className="max-h-[550px] xl:max-h-[660px] overflow-y-auto p-2 sm:p-5">
                  <div className="text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg xl:text-xl font-medium leading-6 text-white-50"
                    >
                      Rastreio
                    </Dialog.Title>
                  </div>
                  <div className="mt-4">
                    <CustomInput
                      defaultValue={tracking_code}
                      onChange={(e) => setCode(e.target.value)}
                      type="text"
                      label="Link de rastreio"
                      textColor="white"
                      h="40px"
                    />
                  </div>
                  <div className="flex flex-col justify-center xl:justify-end items-center xl:items-end mt-5">
                    <Button
                      onClick={submit}
                      size="300px"
                      h="40px"
                      type="button"
                      variant="primary"
                    >
                      <span className="text-base font-medium text-white-50">
                        {isLoading ? <Spinner /> : 'Salvar'}
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

export default InsertCodeDeliverModal;
