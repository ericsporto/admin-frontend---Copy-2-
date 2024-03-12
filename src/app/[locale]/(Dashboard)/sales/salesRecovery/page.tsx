'use client';
import { Button } from '@/components/Global/Button';
import CustomSelect from '@/components/Global/CustomSelect';
import { useState } from 'react';
import { RiCalendar2Line, RiDownloadCloudLine } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SalesRecoveryTable from '@/components/SalesRecovery/SalesRecoveryTable';
import SalesRecoveryCardField from '@/components/SalesRecovery/SalesRecoveryCardField';
import FilterModal from '@/components/SalesRecovery/FilterModal';

function SalesRecovery() {
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const titles = ['Cliente', 'Valor', 'Email', 'SMS', 'Status', 'Link'];

  const handleStartDateChange = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };
  const handleEndDateChange = (date: Date | null) => {
    if (date !== null) {
      setEndDate(date);
    }
  };

  return (
    <main className="flex flex-col xl:px-4 py-6">
      <FilterModal open={openFilterModal} setOpen={setOpenFilterModal} />
      <div className="w-full flex flex-col xl:flex-row items-center justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">
            Recuperação de vendas
          </h1>
          <p className="text-sm font-light text-white-50">3 Registros</p>
        </div>
        <div className="flex w-[402px] xl:w-[300px] mt-6 xl:mt-0">
          <Button
            size="100%"
            h="40px"
            variant="fifth"
            onClick={() => setOpenModal(true)}
          >
            <RiDownloadCloudLine size={24} />
            <span className="text-[15px] font-bold text-white-200">
              Exportar .csv
            </span>
          </Button>
        </div>
      </div>
      <div className="hidden xl:flex mt-10 gap-4">
        <CustomSelect h="34px" w="217px">
          <option>Tipo de recuperação</option>
        </CustomSelect>
        <CustomSelect h="34px" w="108px">
          <option>Planos</option>
        </CustomSelect>
        <CustomSelect h="34px" w="111px">
          <option>Cliente</option>
        </CustomSelect>
        <div className="flex items-center border border-gray-50 rounded-[10px] px-2 py-1 mt-4 xl:mt-0 w-[337px]">
          <RiCalendar2Line className="w-6 h-6 text-gray-50 mr-10" />
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartDateChange(date)}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className="bg-transparent w-[90px] text-base text-white-50 font-medium cursor-pointer outline-none"
          />
          <p className="text-base text-white-50 font-medium px-2">-</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndDateChange(date)}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className="bg-transparent w-24 text-base text-white-50 font-medium cursor-pointer outline-none"
          />
        </div>
      </div>
      <div className="flex xl:hidden mt-8 justify-start items-start w-32">
        <Button
          onClick={() => setOpenFilterModal(true)}
          variant="tertiary"
          h="34px"
        >
          <span className="text-white-50 text-[15px] font-medium">Filtros</span>
        </Button>
      </div>
      <SalesRecoveryTable titles={titles} />
      <SalesRecoveryCardField />
    </main>
  );
}

export default SalesRecovery;
