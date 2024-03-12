'use client';
import { Button } from '@/components/Global/Button';
import NoData from '@/components/Global/NoData';
import CreateStoreModal from '@/components/Stores/Modals/CreateStoreModal';
import StoresCardField from '@/components/Stores/StoresCardField';
import StoresTable from '@/components/Stores/StoresTable';
import useFetchStores from '@/requests/queries/storesQueries/getStores';
import useUserStore from '@/stores/useAuthStore';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { FaStoreSlash } from 'react-icons/fa';

function Stores() {
  const {user} = useUserStore()
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { data: stores, isLoading } = useFetchStores();
  const titles = ['Loja', 'Status', 'Data de criação'];

  return (
    <main className="flex flex-col xl:p-2">
      <CreateStoreModal open={openModal} setOpen={setOpenModal} />
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">Lojas</h1>
          <p className="text-sm font-light text-white-50">
            {stores?.data.length} Registros
          </p>
        </div>
        {user?.user.has_company && (
          <div className="flex w-[300px] xl:w-[402px]">
            <Button size="100%" onClick={() => setOpenModal(true)}>
              <BiAddToQueue size={24} />
              <span className="text-base font-bold text-white-200">
                Criar loja
              </span>
            </Button>
          </div>
        )}
      </div>
      {stores?.data && stores?.data?.length > 0 ? (
        <>
          <StoresTable
            titles={titles}
            page={page}
            stores={stores}
            setPage={setPage}
            isLoading={isLoading}
          />

          <StoresCardField
            stores={stores}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
          />
        </>
      ) : (
        <NoData
          icon={<FaStoreSlash size={40} className="text-gray-50" />}
          description="Nenhuma loja integrada, quando houverem serão exibidas aqui. Para criar uma loja é necessário, primeiro, o cadastro de uma empresa."
        />
      )}
    </main>
  );
}

export default Stores;
