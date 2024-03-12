'use client';
import { Button } from "@/components/Global/Button";
import NoData from "@/components/Global/NoData";
import CreateProductModal from "@/components/Products/Modals/CreateProductModal";
import ProductsCardField from "@/components/Products/ProductsCardField";
import ProductsTable from "@/components/Products/ProductsTable";
import useFetchProducts from "@/requests/queries/productsQueries/getProducts";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaStoreSlash } from "react-icons/fa";

type PageProps = {
  params: {
    uuid: string;
  };
};


function Products({ params: { uuid } }: PageProps) {
  const [openModal, setOpenModal] = useState(false);
  const titles = ['Produto', 'Status', 'Data de cadastro'];
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useFetchProducts(uuid);

  return (

    <main className="flex flex-col xl:p-2">
      <CreateProductModal open={openModal} setOpen={setOpenModal} store_uuid={uuid} />
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">Produtos</h1>
          <p className="text-sm font-light text-white-50 text-center">
            {products?.total as number > 0 ? `${products?.data.length} Registros` : 'Gerencie facilmente os detalhes e configurações dos produtos.'}
          </p>
        </div>
        <div className="flex w-full md:w-[300px] mt-8 xl:mt-0">
          <Button
            onClick={() => setOpenModal(true)}
            size="100%">
            <BiAddToQueue size={24} />
            <span className="text-base font-bold text-white-200">
              Criar produto
            </span>
          </Button>
        </div>
      </div>

      {products?.data && products?.data?.length > 0 ? (
        <>
          <ProductsTable
            titles={titles}
            page={page}
            products={products}
            setPage={setPage}
            isLoading={isLoading}
            store_uuid={uuid}
          />

          <ProductsCardField
            products={products}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            store_uuid={uuid}
          />
        </>
      ) : (
        <NoData
          icon={<FaStoreSlash size={40} className="text-gray-50" />}
          description="Nenhum produto, quando houverem serão exibidos aqui."
        />
      )}
    </main>
  );
}

export default Products;
