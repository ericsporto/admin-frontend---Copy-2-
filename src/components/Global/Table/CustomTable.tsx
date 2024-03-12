import { ReactNode } from 'react';
import CustomTableHeader from './CustomTableHeader';

interface CustomTableProps {
  titles: string[];
  children: ReactNode
}

const CustomTable: React.FC<CustomTableProps> = ({ titles, children }) => {
  return (
    <div className="px-8">
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full whitespace-nowrap">
              <CustomTableHeader titles={titles} />
              <tbody>
               {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
