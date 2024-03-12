import React from 'react';
import Spinner from '../Global/Spinner';
import Paginate from '../Global/Pagination';
import ProductsCard from './ProductsCard';
import { ProductsListModel } from '@/interfaces/productsInterfaces/products';

interface ProductsCardFieldProps {
  products?: ProductsListModel;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  store_uuid: string
}

const ProductsCardField: React.FC<ProductsCardFieldProps> = ({
  products,
  page,
  setPage,
  isLoading,
}) => {
  return (
    <div className="flex xl:hidden flex-col rounded-[20px] bg-gray-200 mt-10 p-6 space-y-4">
      {products?.data.map((item, index) => (
        <ProductsCard
          key={index}
          name={item?.name}
          status={item?.is_active}
          createDate={item.created_at}
          id={item.id}
        />
      ))}
      <div className="w-full flex justify-center">
        {isLoading && <Spinner />}
      </div>
      <Paginate setPage={setPage} page={page} data={products} />
    </div>
  );
};

export default ProductsCardField;
