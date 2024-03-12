import React, { ReactNode } from 'react';

interface CustomTdProps {
  children?: ReactNode;
  h?: string;
  variant?: string;
}

export const CustomTd: React.FC<CustomTdProps> = (props: CustomTdProps) => {
  const { children, h, variant } = props;
  switch (variant) {
    case 'normal':
      return <TdNormal {...props} />;
    case 'roundedLeft':
      return <TdRoundedLeft {...props} />;
    case 'roundedRight':
      return <TdRoundedRight {...props} />;
  }
  return <TdNormal {...props} />;
};

export const TdNormal = (props: CustomTdProps) => {
  const { children, h } = props;
  return (
    <td className="text-center">
      <dd
        className="flex items-center justify-center border border-gray-50 border-r-0 border-l-0 p-2 mt-2 -ml-1"
        style={{
          height: h ? h : '55px',
        }}
      >
        {children}
      </dd>
    </td>
  );
};
export const TdRoundedLeft = (props: CustomTdProps) => {
  const { children, h } = props;
  return (
    <td className="text-center">
      <dd
        className="flex border border-gray-50 border-r-0 rounded-l-[10px] p-2 mt-2"
        style={{
          height: h ? h : '55px',
        }}
      >
        {children}
      </dd>
    </td>
  );
};
export const TdRoundedRight = (props: CustomTdProps) => {
  const { children, h, variant, ...rest } = props;
  return (
    <td className="text-center">
      <dd
        className="flex items-center justify-center border border-gray-50 border-l-0 rounded-r-[10px] p-2 mt-2 -ml-1"
        style={{
          height: h ? h : '55px',
        }}
      >
        {children}
      </dd>
    </td>
  );
};
