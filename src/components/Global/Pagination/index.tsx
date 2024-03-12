import React from 'react';

interface PaginateProps {
  data?: any;
  setPage: (page: number) => void;
  page: number;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Paginate: React.FC<PaginateProps> = ({ data, setPage, page }) => {
  const pages = data && Math.ceil(data?.total / data?.per_page);

  const toPage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex w-full mt-8 justify-end px-8">
      <ul className="flex">
        {Array.from({ length: Math.min(pages as number) })
          .map((_, index) => index + 1)
          .map((pageNumber, index) => (
            <li key={index}>
              <button
                onClick={() => toPage(pageNumber)}
                className={classNames(
                  'flex justify-center items-center rounded-[10px] p-3 w-10 text-[13px] font-medium text-white-50 cursor-pointer',
                  page === pageNumber
                    ? 'bg-green-50'
                    : 'bg-gray-900 hover:bg-gray-800 transition-all ease-in-out'
                )}
              >
                {pageNumber}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Paginate;
