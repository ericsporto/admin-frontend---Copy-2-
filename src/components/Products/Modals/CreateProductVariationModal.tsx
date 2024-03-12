'use client';
import { Fragment, useState, ChangeEvent, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { useForm } from 'react-hook-form';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../Global/Spinner';
import { BiAddToQueue } from 'react-icons/bi';
import { TiTrash } from 'react-icons/ti';
import {
  CreateProductsCredentials,
  ProductByIdModel,
} from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import Image from 'next/image';
import {
  formatCurrency,
  formatNumberBeforeRequest,
} from '@/utils/hacks/formatNumbers';
import ColorsDropdown from '../ColorsDropdown';
import { useLocale } from 'next-intl';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product_uuid: string;
  store_uuid: string;
  product?: ProductByIdModel;
}

const CreateProductVariationModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  product_uuid,
  store_uuid,
  product,
}) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('');
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const [imagesVariation, setImagesVariation] = useState<string[]>([]);
  const [imagesVariationFile, setImagesVariationFile] = useState<File[]>([]);

  const { register, handleSubmit, setValue, watch } =
    useForm<CreateProductsCredentials>();

  const onSubmit = async (data: CreateProductsCredentials) => {
    setIsLoading(true);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const newData: Partial<CreateProductsCredentials> = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '',
      ),
    );

    const formData = new FormData();
    imagesVariationFile.forEach((image) => {
      formData.append(`images[]`, image);
    });

    for (const [key, value] of Object.entries(newData)) {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        formData.append(key, String(value));
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof File)
      ) {
        for (const file of value) {
          formData.append(`${key}[]`, file);
        }
      }
    }

    if (color) {
      formData.append('color', color);
    }
    if (data.name === '' || typeof data.name === 'undefined') {
      formData.append('name', 'null');
    }

    if (!data.price && typeof data.price !== 'number') {
      formData.append('price', 'null');
    } else {
      formData.append('price', formatNumberBeforeRequest(data.price));
    }

    try {
      const response = await api.post(
        `/admin/stores/${store_uuid}/products/${product_uuid}/variations`,
        formData,
        config,
      );
      if (response?.data) {
        queryClient.invalidateQueries({ queryKey: ['variations'] });
        showSuccess('Variação de produto cadastrada com sucesso!');
        setIsLoading(false);
        setOpen(false);
      }
    } catch {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleVariationImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const imageArray: string[] = [];
    const newImages: File[] = [];

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        newImages.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          imageArray.push(reader.result as string);
          setImagesVariation([...imagesVariation, ...imageArray]);
        };

        reader.readAsDataURL(file);
      }
      setImagesVariationFile([...imagesVariationFile, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...imagesVariation];
    newImages.splice(index, 1);
    setImagesVariation(newImages);
  };

  const { price } = watch();

  useEffect(() => {
    setValue('price', formatCurrency(price, locale));
  }, [price, setValue, locale]);

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
                  <div className="max-h-[550px] xl:max-h-[700px] overflow-y-auto p-2 sm:p-5">
                    <div className="text-left text-white-50">
                      <Dialog.Title
                        as="h3"
                        className="text-lg xl:text-xl font-medium leading-6 "
                      >
                        Criar variação de produto
                      </Dialog.Title>
                      <p className="text-xs xl:text-base font-light">
                        Defina atributos de cor e tamanhos personalizados.
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-white-50 text-[14px]">
                        Fotos*
                      </label>
                      <div className="flex items-center gap-2">
                        {imagesVariation.map((item, index) => (
                          <div
                            key={index}
                            className="relative inline-block w-[120px] h-[140px]"
                          >
                            <Image
                              src={item}
                              alt="image"
                              width={120}
                              height={140}
                              className=" min-w-[120px] h-[140px] object-cover rounded-md"
                            />
                            <div
                              className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50  text-center flex items-end justify-center opacity-0 transition-opacity duration-300"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleRemoveImage(index)}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = '1')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = '0')
                              }
                            >
                              <div className="flex items-center justify-center p-2 bg-gray-900 rounded-md mb-2">
                                <TiTrash size={20} className="text-gray-50 " />
                              </div>
                            </div>
                          </div>
                        ))}
                        {imagesVariation.length < 5 && (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone"
                              className="flex flex-col items-center justify-center w-full h-[140px] border-2 border-gray-50 border-solid rounded-lg cursor-pointer "
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BiAddToQueue
                                  size={20}
                                  className="text-gray-50"
                                />
                                <p className="mb-2 text-sm text-gray-50">
                                  Adicionar Fotos
                                </p>
                              </div>
                              <input
                                onChange={handleVariationImageChange}
                                id="dropzone"
                                type="file"
                                className="hidden"
                                accept=".jpg, .jpeg, .png"
                                multiple
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <span className="mb-2 text-sm text-gray-50">
                        Fotos: {imagesVariation.length}/5 - Escolha a foto
                        principal primeiramente.
                      </span>
                    </div>

                    <div className="mt-4">
                      <CustomInput
                        labelSpan=" (opcional)"
                        type="text"
                        label="Nome do produto"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        h="40px"
                        register={register('name')}
                      />
                      <span className="mb-2 text-sm text-gray-50">
                        Se nenhum nome for fornecido, será utilizado o nome do
                        produto original por padrão.
                      </span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <CustomInput
                        labelSpan=" (opcional)"
                        label="Tamanho"
                        type="text"
                        textColor="white"
                        h="40px"
                        register={register('size')}
                      />
                      <ColorsDropdown color={color} setColor={setColor} />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="Valor*"
                        className="font-medium text-white-50 text-base"
                      >
                        Valor{' '}
                        <span className="text-sm text-gray-50">(opcional)</span>
                      </label>
                      <div className="flex items-end gap-2 ">
                        <p className="text-[1.5rem] text-green-100 font-bold pb-1">
                          R$
                        </p>
                        <CustomInput
                          type="text"
                          maxLength={100}
                          textColor="white"
                          h="40px"
                          register={register('price')}
                          step={0.01}
                          min={0.01}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        labelSpan=" (Opcional)"
                        type="text"
                        label="Descrição"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        h="40px"
                        register={register('description')}
                      />
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        labelSpan=" (opcional)"
                        type="text"
                        label="Número de Identificação"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        placeholder="Ex.: SKU 010203040506N"
                        whitePlaceholder={true}
                        h="40px"
                        register={register('sku')}
                      />
                      <span className="mb-2 text-sm text-gray-50">
                        Visível somente para você
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2  mt-5 w-full">
                      <Button
                        size="300px"
                        type="button"
                        variant="fifth"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-base font-bold text-white-50">
                          Voltar
                        </span>
                      </Button>
                      <Button size="300px" type="submit" variant="primary">
                        <span className="text-base font-bold text-white-50">
                          {isLoading ? <Spinner /> : 'Adicionar'}
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

export default CreateProductVariationModal;
