'use client';
import { Fragment, useState, ChangeEvent, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import { useForm } from 'react-hook-form';
import useResponse from '@/hooks/useResponse';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../Global/Spinner';
import { Switch } from '@/components/Global/SwitchButton';
import CustomSelect from '@/components/Global/CustomSelect';
import { BsFillLayersFill } from 'react-icons/bs';
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
import CreateProductVariationModal from './CreateProductVariationModal';
import useFetchProductById from '@/requests/queries/productsQueries/getProductById';
import useFetchVariations from '@/requests/queries/variationsQueries/getVariations';
import { HiPencilAlt } from 'react-icons/hi';
import UpdateProductVariationModal from './UpdateProductVariationModal';
import { CategoryDropdownModel } from '@/interfaces/categoriesInterfaces/categories';
import { useLocale } from 'next-intl';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product_uuid: string;
  store_uuid: string;
}

const UpdateProductModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  product_uuid,
  store_uuid,
}) => {
  const locale = useLocale();
  const { data: categories } = useFetchCategoriesDropdown(store_uuid);
  const { data: product } = useFetchProductById(store_uuid, product_uuid);
  const { data: variations } = useFetchVariations(store_uuid, product_uuid);
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CategoryDropdownModel>();
  const [search, setSearch] = useState('');
  const { showSuccess, showError } = useResponse();
  const queryClient = useQueryClient();
  const [imagesFile, setImagesFile] = useState<File[]>([]);
  const [openVariation, setOpenVariation] = useState(false);
  const [openUpdateVariation, setOpenUpdateVariation] = useState(false);
  const [variationId, setVariationId] = useState('');
  const statusOptions = [
    { id: 0, name: 'Inativo', value: false },
    { id: 1, name: 'Ativo', value: true },
  ];

  const handleDeleteProduct = async () => {
    setDeleteIsLoading(true);

    try {
      await api.delete(`/admin/stores/${store_uuid}/products/${product_uuid}`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showSuccess('Produto excluído com sucesso!');
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
      is_digital: digitalProduct === true ? '1' : '0',
      category_id: currentCategory?.id,
      price: formatNumberBeforeRequest(data.price),
    };
    try {
      const response = await api.put(
        `/admin/stores/${store_uuid}/products/${product_uuid}`,
        payload,
      );
      if (response?.data) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        showSuccess('Produto editado com sucesso!');
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
        `/admin/stores/${store_uuid}/products/${product_uuid}/images/${id}`,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['product-by-id'] }),
        queryClient.invalidateQueries({ queryKey: ['products'] }),
      ]);
      setIsImageDeleting(false);
    } catch {
      setIsImageDeleting(false);
      showError('Error on delete image!');
    }
  };

  const handleUpdateImage = useCallback(async () => {
    if (product && product?.images?.length >= 5)
      return showError('Only five images!');
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const formData = new FormData();
    imagesFile.forEach((image) => {
      formData.append(`image`, image);
    });

    try {
      await api.post(
        `/admin/stores/${store_uuid}/products/${product_uuid}/images`,
        formData,
        config,
      );
      setImagesFile([]);
      queryClient.invalidateQueries({ queryKey: ['product-by-id'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch {
      setImagesFile([]);
      showError('Error to update image!');
    }
  }, [imagesFile, store_uuid, queryClient, showError, product_uuid, product]);

  const handleChangeDigitalProductSwitch = () => {
    const newValue = !digitalProduct;
    setDigitalProduct(newValue);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      const newImage = file[0];
      setImagesFile([newImage]);
    }
  };

  const { price } = watch();

  useEffect(() => {
    if (imagesFile.length > 0) {
      handleUpdateImage();
    }
  }, [imagesFile, handleUpdateImage]);

  useEffect(() => {
    setValue('price', formatCurrency(price, locale));
  }, [price, setValue, locale]);

  useEffect(() => {
    if (product) {
      const hasCategory = categories?.find((item: CategoryDropdownModel) =>
        product.category_id === item.id ? item : '',
      );
      setDigitalProduct(product.is_digital ?? false);
      setCurrentCategory(hasCategory);
      setValue('name', product?.name);
      setValue('price', (product?.price * 100).toString());
      setValue('description', product?.description);
      setValue('sku', product?.sku);
    }
  }, [product, setValue, categories]);

  const handleOpenVariation = () => {
    setOpenVariation(true);
  };
  const handleOpenUpdateVariation = async (id: string) => {
    await setVariationId(id);
    setOpenUpdateVariation(true);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <CreateProductVariationModal
          open={openVariation}
          setOpen={setOpenVariation}
          product_uuid={product_uuid}
          store_uuid={store_uuid}
          product={product}
        />
        <UpdateProductVariationModal
          open={openUpdateVariation}
          setOpen={setOpenUpdateVariation}
          product_uuid={product_uuid}
          store_uuid={store_uuid}
          variation_uuid={variationId}
        />
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
                        Editar produto
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
                        {product?.images?.map((item, index) => (
                          <div
                            key={index}
                            className="relative inline-block w-[120px] h-[140px]"
                          >
                            <Image
                              src={item?.path}
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
                        {product && product?.images?.length < 5 && (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="zone"
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
                                id="zone"
                                type="file"
                                className="hidden"
                                accept=".jpg, .jpeg, .png"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <span className="mb-2 text-sm text-gray-50">
                        Fotos: {product && product?.images?.length}/5 - Escolha
                        a foto principal primeiramente. <br /> Obs.: As imagens
                        precisam ter a dimensão quadrada com tamanho entre 400 e
                        800 pixels.
                      </span>
                    </div>

                    <div className="mt-4">
                      <CustomInput
                        defaultValue={product?.name}
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
                        defaultChecked={product?.is_digital}
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
                          defaultValue={product?.price}
                          type="text"
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
                        defaultValue={product?.description}
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
                        defaultValue={product?.sku}
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
                        defaultValue={product?.is_active === true ? 1 : 0}
                        label="Status*"
                        labelFontSize="14px"
                        textColor="white"
                        h="40px"
                        register={register('is_active')}
                        required
                      >
                        {statusOptions.map((item, index) => (
                          <option
                            key={index}
                            className="text-black"
                            value={item.value === true ? 1 : 0}
                            selected={item.value === product?.is_active}
                          >
                            {item.name}
                          </option>
                        ))}
                      </CustomSelect>
                    </div>
                    {variations && variations.data.length > 0 && (
                      <div className="mt-4">
                        <p className="text-white-50 text-sm font-medium pb-2">
                          Variações
                        </p>
                        <div className="border border-gray-50 rounded-[10px] p-3 space-y-2">
                          {variations?.data.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-white-50"
                            >
                              <div className="flex items-center text-left gap-2">
                                <div className="flex justify-center items-center p-2 rounded-[10px] text-white-50 bg-green-50 font-bold text-[15px]">
                                  CE
                                </div>
                                <div>
                                  <p className="text-white-50 text-xs font-medium">
                                    {item.name}
                                  </p>
                                  <p className="text-gray-50 text-[10px] font-light">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <HiPencilAlt
                                size={22}
                                className="cursor-pointer"
                                onClick={() =>
                                  handleOpenUpdateVariation(item.id)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2  mt-5 w-full">
                      <Button
                        size="300px"
                        type="button"
                        variant="fifth"
                        onClick={handleOpenVariation}
                      >
                        <BsFillLayersFill size={24} />
                        <span className="text-base font-bold text-white-50">
                          Adicionar variações
                        </span>
                      </Button>
                      <Button
                        onClick={handleDeleteProduct}
                        size="200px"
                        type="button"
                        variant="sixth"
                      >
                        <TiTrash size={24} />
                        <span className="text-base font-bold">
                          {deleteIsLoading ? <Spinner /> : 'Excluir'}
                        </span>
                      </Button>
                      <Button size="200px" type="submit" variant="primary">
                        <span className="text-base font-bold">
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

export default UpdateProductModal;
