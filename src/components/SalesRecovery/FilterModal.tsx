'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import CustomSelect from '@/components/Global/CustomSelect';

interface CreateTransactionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const FilterModal: React.FC<CreateTransactionModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 xl:hidden" onClose={setOpen}>
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
          <div className="flex min-h-full items-start justify-start text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform bg-green-300 p-4 pb-4 text-left overflow-hidden shadow-xl transition-all w-2/3">
                <div className="min-h-screen overflow-y-auto p-2 sm:p-5">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-white-50 text-lg font-medium">
                      Filtrar por:
                    </h1>
                    <CustomSelect h="34px">
                      <option>Tipo de recuperação</option>
                    </CustomSelect>
                    <CustomSelect h="34px">
                      <option>Planos</option>
                    </CustomSelect>
                    <CustomSelect h="34px">
                      <option>Cliente</option>
                    </CustomSelect>
                  </div>
                  <div className="flex flex-col justify-end items-end mt-10">
                    <Button
                      onClick={() => setOpen(false)}
                      size="150px"
                      h="48px"
                      type="button"
                      variant="primary"
                    >
                      <span className="text-lg font-medium text-white-50">
                        Filtrar
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

export default FilterModal;
