import Image from 'next/image';
import React from 'react';

interface NoDataProps {
  icon: React.ReactNode;
  description: string;
}

const NoData: React.FC<NoDataProps> = ({ icon, description }) => {
  return (
    <main className="flex flex-col xl:flex-row items-center justify-center xl:justify-between mt-10 xl:mt-20">
      <aside className="flex flex-col justify-center items-center px-16 xl:px-14 text-center gap-4 xl:w-[50%]">
        {icon}
        <p className="text-base font-medium text-gray-50">{description}</p>
      </aside>
      <aside className="hidden xl:flex">
        <Image
          src="/images/no-data-image.svg"
          alt="no-data-image"
          width={530}
          height={500}
        />
      </aside>
      <aside className="flex xl:hidden">
        <Image
          src="/images/no-data-image-mobile.svg"
          alt="no-data-image"
          width={402}
          height={446}
        />
      </aside>
    </main>
  );
};

export default NoData;
