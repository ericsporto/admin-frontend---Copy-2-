'use client';
import CategoriesCardField from '@/components/Categories/CategoriesCardField';
import CategoriesTable from '@/components/Categories/CategoriesTable';
import CreateCategoryModal from '@/components/Categories/Modals/CreateCategoryModal';
import { Button } from '@/components/Global/Button';
import NoData from '@/components/Global/NoData';
import useFetchCategories from '@/requests/queries/categoriesQueries/getCategories';
import { useState } from 'react';
import { BiAddToQueue, BiCategory } from 'react-icons/bi';

type PageProps = {
  params: {
    uuid: string;
  };
};

function Categories({ params: { uuid } }: PageProps) {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { data: categories, isLoading } = useFetchCategories(uuid);
  const titles = ['Nome', 'Descrição', 'Status'];

  return (
    <main className="flex flex-col xl:p-2">
      <CreateCategoryModal
        open={openModal}
        setOpen={setOpenModal}
        store_uuid={uuid}
      />
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">Categorias</h1>
          <p className="text-sm font-light text-white-50">
            {categories?.data.length} Registros
          </p>
        </div>
        <div className="flex w-[402px] xl:w-[300px] mt-7 xl:mt-0">
          <Button size="100%" onClick={() => setOpenModal(true)}>
            <BiAddToQueue size={24} />
            <span className="text-base font-bold text-white-200">
              Criar categoria
            </span>
          </Button>
        </div>
      </div>
      {categories?.data && categories?.data.length > 0 ? (
        <>
          <CategoriesTable
            titles={titles}
            page={page}
            categories={categories}
            setPage={setPage}
            isLoading={isLoading}
            store_uuid={uuid}
          />
          <CategoriesCardField
            categories={categories}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            store_uuid={uuid}
          />
        </>
      ) : (
        <NoData
          icon={<BiCategory size={40} className="text-gray-50" />}
          description="Nenhuma categoria criada, quando houverem serão exibidas aqui."
        />
      )}
    </main>
  );
}

export default Categories;
