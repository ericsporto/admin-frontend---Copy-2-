import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { MdOutlineUploadFile } from 'react-icons/md';
import { api } from '@/services/api';
import Spinner from '../Global/Spinner';
import { useQueryClient } from '@tanstack/react-query';

interface ModalKycProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface PropsOfficalId {
    documentFrontFileName: string;
    documentFrontFile: File | Blob | null;
    documentBackFileName: string;
    documentBackFile: File | Blob | null;
}

const ModalKyc: React.FC<ModalKycProps> = ({
    open,
    setOpen,
}) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false)
    const [officialId, setOfficalId] = useState<PropsOfficalId>({
        documentFrontFileName: '',
        documentFrontFile: null,
        documentBackFileName: '',
        documentBackFile: null
    })

    const handleDocumentFrontFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileInput = event.target;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            setOfficalId({ ...officialId, documentFrontFileName: fileInput.files[0].name, documentFrontFile: fileInput.files[0] });
        } else {
            setOfficalId({ ...officialId, documentFrontFileName: '', documentFrontFile: null });
        }
    };
    const handleDocumentBackFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileInput = event.target;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            setOfficalId({ ...officialId, documentBackFileName: fileInput.files[0].name, documentBackFile: fileInput.files[0] });
        } else {
            setOfficalId({ ...officialId, documentBackFileName: '', documentBackFile: null });
        }
    };

    const handleSendDocument = async () => {
        setIsLoading(true);
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        const formDataFront = new FormData();
        if (officialId.documentFrontFile) {
            formDataFront.append('file', officialId.documentFrontFile);
            formDataFront.append('tag', 'official_id_front');
            try {
                await api.post(
                    `/admin/seller/kyc/files`,
                    formDataFront,
                    config
                );
            } catch (error) {
                setIsLoading(false)
                return error
            }
        }

        const formDataBack = new FormData();
        if (officialId.documentBackFile) {
            formDataBack.append('file', officialId.documentBackFile);
            formDataBack.append('tag', 'official_id_back');
            try {
                await api.post(
                    `/admin/seller/kyc/files`,
                    formDataBack,
                    config
                );
            } catch (error) {
                setIsLoading(false)
                return error
            }
        }

        try {
            await api.post(
                `admin/seller/kyc/ready`,
            );
            queryClient.invalidateQueries({ queryKey: ['current'] });
        } catch (error) {
            setIsLoading(false)
            return error
        }
        setIsLoading(false)
        setOpen(false)
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
                                            className="text-base xl:text-2xl font-bold leading-6 text-white-100"
                                        >
                                            Estamos quase lá!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm xl:text-base font-medium text-white-100">
                                                Calma! Está quase terminando... <br />
                                                Apenas mais uma etapa para turbinar suas vendas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 w-full mt-[30px]">
                                    <CustomInput
                                        labelColor='#aeaeae'
                                        label="Frente do documento*"
                                        type="file"
                                        id="front"
                                        iconPosition="right"
                                        h="40px"
                                        onChange={(e) => handleDocumentFrontFileChange(e)}
                                        selectedFileName={officialId.documentFrontFileName}
                                        setSelectedFileName={() => setOfficalId({ ...officialId, documentFrontFileName: '', documentFrontFile: null })}
                                    />
                                    <CustomInput
                                        labelColor='#aeaeae'
                                        label="Verso do documento*"
                                        type="file"
                                        id="back"
                                        iconPosition="right"
                                        h="40px"
                                        onChange={(e) => handleDocumentBackFileChange(e)}
                                        selectedFileName={officialId.documentBackFileName}
                                        setSelectedFileName={() => setOfficalId({ ...officialId, documentBackFileName: '', documentBackFile: null })}
                                    />

                                </div>
                                <div className="flex flex-col justify-center items-center mt-5">
                                    <div className='w-[320px] md:w-[421px]'>
                                        <Button
                                            onClick={handleSendDocument}
                                            size="100%"
                                            type="button"
                                            variant="primary"
                                        >
                                            <span className="text-base font-semibold text-white-200">
                                                {isLoading ? <Spinner /> :
                                                    ' Realizar upload dos documentos '}
                                            </span>
                                        </Button>

                                    </div>
                                    {/* <div className='w-[320px] md:w-[421px] mt-4'>
                                        <Button
                                            onClick={() => router.push(`/${locale}/auth/login`)}
                                            size="100%"
                                            type="button"
                                            variant="secondary"
                                        >
                                            <span className="text-base font-semibold text-gray-900">
                                                Enviar os documentos depois
                                            </span>
                                        </Button>
                                    </div> */}
                                    <div className="mt-4 xl:px-44 text-center">
                                        <p className="text-sm font-normal text-gray-50">
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

export default ModalKyc;
