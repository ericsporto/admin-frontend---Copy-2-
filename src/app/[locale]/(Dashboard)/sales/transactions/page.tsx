'use client';
import { Button } from '@/components/Global/Button';
import { CustomInput } from '@/components/Global/CustomInput';
import CustomSelect from '@/components/Global/CustomSelect';
import FilterModal from '@/components/Transactions/FilterModal';
import TransactionsCardField from '@/components/Transactions/TransactionsCardField';
import TransactionsTable from '@/components/Transactions/TransactionsTable';
import { useState } from 'react';
import { RiCalendar2Line } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';
import useFetchSales from '@/requests/queries/salesQueries/getSales';
import { inputDate } from '@/utils/hacks/editDate';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import useUserStore from '@/stores/useAuthStore';
import useFetchCompaniesDropdown from '@/requests/queries/globalQueries/getCompaniesDropdown';

registerLocale('pt-BR', ptBR);

function Transactions() {
  const { user } = useUserStore();
  const { data: company } = useFetchCompaniesDropdown();
  const [page, setPage] = useState(1);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saleStatus, setSaleStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shippingStatus, setShippingStatus] = useState('');
  const { data: sales, isFetching } = useFetchSales(
    user?.user.has_company && company ? (company[0].id as string) : '',
    search,
    inputDate(startDate),
    inputDate(endDate),
    paymentMethod,
    saleStatus,
    paymentStatus,
    shippingStatus,
  );

  const titles = [
    'Cliente',
    'Forma de Pag.',
    'Status',
    'Produto',
    'Data da transação',
    'Data de pagamento',
  ];

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
      <FilterModal
        open={openFilterModal}
        setOpen={setOpenFilterModal}
        setSearch={setSearch}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        startDate={startDate}
        endDate={endDate}
        setPaymentMethod={setPaymentMethod}
        setSaleStatus={setSaleStatus}
        setPaymentStatus={setPaymentStatus}
        setShippingStatus={setShippingStatus}
      />
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-end justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-green-50 text-2xl font-bold">Transações</h1>
          <p className="text-sm font-light text-white-50">
            {' '}
            {(sales?.total as number) > 0
              ? `${sales?.data.length} Registros`
              : 'Todas transações efetivadas serão exibidas aqui.'}
          </p>
        </div>
      </div>
      <div className="hidden xl:flex xl:flex-col mt-10 gap-4">
        <div className="flex gap-4 w-full xl:w-[600px]">
          <CustomInput
            type="text"
            h="34px"
            placeholder="Pesquisar"
            icon={<FaSearch size={14} className="text-white-50" />}
            iconPosition="left"
            textColor="white"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center border border-gray-50 rounded-[10px] px-2 py-1 mt-4 xl:mt-0 w-[400px]">
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
        <div className="flex gap-4">
          <CustomSelect
            h="34px"
            w="230px"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Método de pagamento</option>
            <option value="bank_slip">Boleto</option>
            <option value="bank_transfer">Transferência bancária</option>
            <option value="credit_card">Cartão de crédito</option>
            <option value="debit_card">Cartão de débito</option>
            <option value="pix">PIX</option>
          </CustomSelect>
          <CustomSelect
            h="34px"
            w="180px"
            onChange={(e) => setSaleStatus(e.target.value)}
          >
            <option value="">Status da venda</option>
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="refused">Recusado</option>
            <option value="cancelled">Cancelado</option>
            <option value="cancelled_antifraud">
              Cancelado por anti-fraude
            </option>
            <option value="chargeback_requested">Estorno solicitado</option>
            <option value="chargeback_refused">Estorno recusado</option>
            <option value="chargeback">Estornado</option>
            <option value="refund_requested">Reembolso solicitado</option>
            <option value="refund_refused">Reembolso recusado</option>
            <option value="refunded">Reembolsado</option>
            <option value="gateway_error">Erro de gateway</option>
            <option value="system_error">Erro de sistema</option>
          </CustomSelect>
          <CustomSelect
            h="34px"
            w="225px"
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">Status do pagamento</option>
            <option value="awaiting_payment">Aguardando pagamento</option>
            <option value="payment_received">Pagamento recebido</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
            <option value="expired">Expirado</option>
            <option value="open_dispute">Disputa aberta</option>
          </CustomSelect>
          <CustomSelect
            h="34px"
            w="180px"
            onChange={(e) => setShippingStatus(e.target.value)}
          >
            <option value="">Status de envio</option>
            <option value="awaiting_shipment">Aguardando envio</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
            <option value="returned">Retornado</option>
          </CustomSelect>
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
      <TransactionsTable
        titles={titles}
        page={page}
        setPage={setPage}
        isLoading={isFetching}
        sales={sales}
      />
      <TransactionsCardField
        page={page}
        setPage={setPage}
        isLoading={isFetching}
        sales={sales}
      />
    </main>
  );
}

export default Transactions;
