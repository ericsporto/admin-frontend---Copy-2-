'use client';
import { Fragment, useState, ChangeEvent, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { useForm } from 'react-hook-form';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../Global/Spinner';
import { Switch } from '@/components/Global/SwitchButton';
import CustomSelect from '@/components/Global/CustomSelect';
import { BiAddToQueue } from 'react-icons/bi';
import { TiTrash } from 'react-icons/ti';
import { CreateProductsCredentials } from '@/interfaces/productsInterfaces/products';
import { api } from '@/services/api';
import useFetchCategoriesDropdown from '@/requests/queries/globalQueries/getCategoriesDropdown';
import Image from 'next/image';
import {
  formatCurrency,
  formatNumberBeforeRequest,
} from '@/utils/hacks/formatNumbers';
import CategoryDropdown from '../CategoryDropdown';
import { CategoryDropdownModel } from '@/interfaces/categoriesInterfaces/categories';
import { useLocale } from 'next-intl';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  store_uuid: string;
}

const CreateProductModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  store_uuid,
}) => {
  const locale = useLocale();
  const { data: categories } = useFetchCategoriesDropdown(store_uuid);
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CategoryDropdownModel>();
  const [search, setSearch] = useState('');
  const { showSuccess } = useResponse();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<string[]>([]);
  const [imagesFile, setImagesFile] = useState<File[]>([]);

  const { register, handleSubmit, setValue, watch } =
    useForm<CreateProductsCredentials>();

  const onSubmit = async (data: CreateProductsCredentials) => {
    setIsLoading(true);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const newData: Partial<CreateProductsCredentials> = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null,
      ),
    );

    const formData = new FormData();
    imagesFile.forEach((image) => {
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

    formData.append(`price`, formatNumberBeforeRequest(data.price));

    if (currentCategory) {
      formData.append(`category_id`, currentCategory.id);
    }
    if (digitalProduct) {
      formData.append(`is_digital`, digitalProduct === true ? '1' : '0');
    }

    try {
      const response = await api.post(
        `/admin/stores/${store_uuid}/products`,
        formData,
        config,
      );
      if (response?.data) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        showSuccess('Produto cadastrado com sucesso!');
        setIsLoading(false);
        setOpen(false);
      }
    } catch {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleChangeDigitalProductSwitch = () => {
    const newValue = !digitalProduct;
    setDigitalProduct(newValue);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          setImages([...images, ...imageArray]);
        };

        reader.readAsDataURL(file);
      }
      setImagesFile([...imagesFile, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
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
                        Criar produto
                      </Dialog.Title>
                      <p className="text-xs xl:text-base font-light">
                        Defina imagens, nome, categoria, descrição, valor e
                        variações.
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-white-50 text-[14px]">
                        Fotos*
                      </label>
                      <div className="flex items-center gap-2">
                        {images.map((item, index) => (
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
                        {images.length < 5 && (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
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
                                onChange={handleImageChange}
                                id="dropzone-file"
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
                        Fotos: {images.length}/5 - Escolha a foto principal
                        primeiramente. <br /> Obs.: As imagens precisam ter a
                        dimensão quadrada com tamanho entre 400 e 800 pixels.
                      </span>
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        type="text"
                        label="Nome do produto*"
                        labelFontSize="14px"
                        maxLength={100}
                        textColor="white"
                        h="40px"
                        register={register('name')}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Switch
                        onChange={handleChangeDigitalProductSwitch}
                        name="digitalProduct"
                        checked={digitalProduct}
                        description="Produto Digital"
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="Valor*"
                        className="font-medium text-white-50 text-[14px]"
                      >
                        Valor*
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
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <CategoryDropdown
                        categories={categories}
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                        search={search}
                        setSearch={setSearch}
                      />
                    </div>
                    <div className="mt-4">
                      <CustomInput
                        labelSpan=" (opcional)"
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
                    </div>
                    <div className="mt-4">
                      <CustomSelect
                        label="Status*"
                        labelFontSize="14px"
                        textColor="white"
                        h="40px"
                        register={register('is_active')}
                        required
                      >
                        <option value={1}>Ativo</option>
                        <option value={0}>Inativo</option>
                      </CustomSelect>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-5 w-full">
                      <Button size="300px" type="submit" variant="primary">
                        <span className="text-base font-bold text-white-50">
                          {isLoading ? <Spinner /> : 'Criar'}
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

export default CreateProductModal;
