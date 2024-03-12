import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Button } from '../Global/Button';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

interface AlmostThereModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlmostThereModal: React.FC<AlmostThereModalProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter();
  const locale = useLocale();

  const handleRedirect = async () => {
    router.push(`/${locale}/companies/uploadDocuments`);
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-green-300 p-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[837px] sm:p-6">
                <div>
                  <div className="mx-auto flex w-full items-center justify-center">
                    <Image
                      src="/images/logo-x-white.svg"
                      alt="x-logo"
                      width={50}
                      height={63}
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base xl:text-2xl font-bold leading-6 text-white-50"
                    >
                      Estamos quase lá!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm xl:text-base font-medium text-white-50">
                        Calma! Está quase terminando... <br />
                        Apenas mais uma etapa para turbinar suas vendas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden xl:flex flex-col justify-center items-center mt-5">
                  <Button
                    onClick={handleRedirect}
                    size="421px"
                    type="button"
                    variant="primary"
                  >
                    <span className="text-base font-semibold text-white-200">
                      Realizar upload dos documentos
                    </span>
                  </Button>
                  <div className="mt-4 xl:px-44 text-center">
                    <p className="text-sm font-normal text-gray-50">
                      Após realizar o upload dos documentos, sua conta passará
                      por uma análise do nosso time.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col xl:hidden justify-center items-center mt-5">
                  <Button
                    onClick={handleRedirect}
                    size="370px"
                    type="button"
                    variant="primary"
                  >
                    <span className="text-sm font-medium text-white-200">
                      Realizar upload dos documentos
                    </span>
                  </Button>
                  <div className="mt-4 xl:px-28 text-center">
                    <p className="text-xs font-normal text-gray-50">
                      Após realizar o upload dos documentos, sua conta passará
                      por uma análise do nosso time.
                    </p>
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

export default AlmostThereModal;
