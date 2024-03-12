'use client';
import { Fragment, useState, ChangeEvent, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { useForm } from 'react-hook-form';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../Global/Spinner';
import { BiAddToQueue } from 'react-icons/bi';
import { TiTrash } from 'react-icons/ti';
import { CreateProductsCredentials } from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import Image from 'next/image';
import {
  formatCurrency,
  formatNumberBeforeRequest,
} from '@/utils/hacks/formatNumbers';
import ColorsDropdown from '../ColorsDropdown';
import useFetchVariationById from '@/requests/queries/variationsQueries/getVariationById';
import { useLocale } from 'next-intl';
import { ColorsModel, colors } from '@/utils/objects/colors';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product_uuid: string;
  store_uuid: string;
  variation_uuid: string;
}

const UpdateProductVariationModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  product_uuid,
  store_uuid,
  variation_uuid,
}) => {
  const locale = useLocale();
  const { data: variation } = useFetchVariationById(
    store_uuid,
    product_uuid,
    variation_uuid,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [color, setColor] = useState('');
  const { showSuccess, showError } = useResponse();
  const queryClient = useQueryClient();
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [imagesVariationFile, setImagesVariationFile] = useState<File[]>([]);

  const handleDeleteVariant = async () => {
    setDeleteIsLoading(true);

    try {
      await api.delete(
        `/admin/stores/${store_uuid}/products/${product_uuid}/variations/${variation_uuid}`,
      );
      queryClient.invalidateQueries({ queryKey: ['variations'] });
      showSuccess('Variante de produto excluído com sucesso!');
      setDeleteIsLoading(false);
      setOpen(false);
    } catch {
      setDeleteIsLoading(false);
      setOpen(false);
    }
  };

  const { register, handleSubmit, setValue, watch } =
    useForm<CreateProductsCredentials>();

  const onSubmit = async (data: CreateProductsCredentials) => {
    setIsLoading(true);

    const newData: Partial<CreateProductsCredentials> = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null,
      ),
    );

    const payload = {
      ...newData,
      price: formatNumberBeforeRequest(data.price),
      color: color ?? variation?.color,
    };
    try {
      const response = await api.put(
        `/admin/stores/${store_uuid}/products/${product_uuid}/variations/${variation_uuid}`,
        payload,
      );
      if (response?.data) {
        queryClient.invalidateQueries({ queryKey: ['variations'] });
        showSuccess('Variante de produto editada com sucesso!');
        setIsLoading(false);
        setOpen(false);
      }
    } catch {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (isImageDeleting) return;
    setIsImageDeleting(true);
    try {
      await api.delete(
        `/admin/stores/${store_uuid}/products/${product_uuid}/variations/${variation_uuid}/images/${id}`,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['variation-by-id'] }),
        queryClient.invalidateQueries({ queryKey: ['variations'] }),
      ]);
      setIsImageDeleting(false);
    } catch {
      setIsImageDeleting(false);
      showError('Error on delete image!');
    }
  };

  const handleUpdateVariationImage = useCallback(async () => {
    if (variation && variation?.images?.length >= 5)
      return showError('Only five images!');
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const formData = new FormData();
    imagesVariationFile.forEach((image) => {
      formData.append(`image`, image);
    });

    try {
      await api.post(
        `/admin/stores/${store_uuid}/products/${product_uuid}/variations/${variation_uuid}/images`,
        formData,
        config,
      );
      setImagesVariationFile([]);
      queryClient.invalidateQueries({ queryKey: ['variation-by-id'] });
      queryClient.invalidateQueries({ queryKey: ['variations'] });
    } catch {
      setImagesVariationFile([]);
      showError('Error to update image!');
    }
  }, [
    imagesVariationFile,
    store_uuid,
    queryClient,
    showError,
    product_uuid,
    variation_uuid,
    variation
  ]);

  const handleImageVariationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      const newImage = file[0];
      setImagesVariationFile([newImage]);
    }
  };

  const { price } = watch();

  useEffect(() => {
    if (imagesVariationFile.length > 0) {
      handleUpdateVariationImage();
    }
  }, [imagesVariationFile, handleUpdateVariationImage]);

  useEffect(() => {
    setValue('price', formatCurrency(price, locale));
  }, [price, setValue, locale]);

  useEffect(() => {
    if (variation) {
      const hasColor = colors?.find((item: ColorsModel) =>
        variation?.color?.includes(item.code),
      );
      if (hasColor) {
        setColor(hasColor?.code);
      }
      setValue('name', variation?.name);
      setValue('size', variation?.size);
      setValue('price', (variation?.price * 100).toString());
      setValue('description', variation?.description);
      setValue('sku', variation?.sku);
    }
  }, [variation, setValue]);

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
                        Editar variação de produto
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
                        {variation?.images?.map((item, index) => (
                          <div
                            key={index}
                            className="relative inline-block w-[120px] h-[140px]"
                          >
                            <Image
                              src={item.path}
                              alt="image"
                              width={120}
                              height={140}
                              className=" min-w-[120px] h-[140px] object-cover rounded-md"
                            />
                            <div
                              className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50  text-center flex items-end justify-center opacity-0 transition-opacity duration-300"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleDeleteImage(item.id)}
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
                        {variation && variation?.images?.length < 5 && (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="drop"
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
                                onChange={handleImageVariationChange}
                                id="drop"
                                type="file"
                                className="hidden"
                                accept=".jpg, .jpeg, .png"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <span className="mb-2 text-sm text-gray-50">
                        Fotos: {variation && variation?.images?.length}/5 -
                        Escolha a foto principal primeiramente. <br /> Obs.: As
                        imagens precisam ter a dimensão quadrada com tamanho
                        entre 400 e 800 pixels.
                      </span>
                    </div>

                    <div className="mt-4">
                      <CustomInput
                        defaultValue={variation?.name}
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
                        defaultValue={variation?.size}
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
                          defaultValue={variation?.price}
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
                        defaultValue={variation?.description}
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
                        defaultValue={variation?.sku}
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
                      <Button
                        onClick={handleDeleteVariant}
                        size="200px"
                        type="button"
                        variant="sixth"
                      >
                        <TiTrash size={24} />
                        <span className="text-base font-bold">
                          {deleteIsLoading ? <Spinner /> : 'Excluir'}
                        </span>
                      </Button>
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

export default UpdateProductVariationModal;
