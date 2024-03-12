import React from 'react';

interface TableHeaderProps {
  titles: string[];
}

const CustomTableHeader: React.FC<TableHeaderProps> = ({ titles }) => {
  return (
    <thead>
      <tr>
        {titles.map((item, index) => (
          <th
            key={index}
            scope="col"
            className="px-3 py-3.5 text-center text-sm font-medium text-gray-50"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
