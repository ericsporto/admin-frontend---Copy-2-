'use client';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/Global/Button';
import CustomSelect from '@/components/Global/CustomSelect';
import { CustomInput } from '../Global/CustomInput';
import { FaSearch } from 'react-icons/fa';
import { RiCalendar2Line } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CreateTransactionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSearch: (search: string) => void;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  startDate: Date;
  endDate: Date;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  setSaleStatus: Dispatch<SetStateAction<string>>;
  setPaymentStatus: Dispatch<SetStateAction<string>>;
  setShippingStatus: Dispatch<SetStateAction<string>>;
}

const FilterModal: React.FC<CreateTransactionModalProps> = ({
  open,
  setOpen,
  setSearch,
  handleEndDateChange,
  handleStartDateChange,
  startDate,
  endDate,
  setPaymentMethod,
  setSaleStatus,
  setPaymentStatus,
  setShippingStatus,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 xl:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-start justify-start text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform bg-green-300 p-4 pb-4 text-left overflow-hidden shadow-xl transition-all w-full">
                <div className="min-h-screen overflow-y-auto p-2 sm:p-5">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-white-50 text-lg font-medium">
                      Filtrar por:
                    </h1>
                    <CustomInput
                      type="text"
                      h="34px"
                      placeholder="Pesquisar"
                      icon={<FaSearch size={14} className="text-white-50" />}
                      iconPosition="left"
                      textColor="white"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex items-center border border-gray-50 rounded-[10px] px-2 py-1 w-[300px]">
                      <RiCalendar2Line className="w-6 h-6 text-gray-50 mr-10" />
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => handleStartDateChange(date)}
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        className="bg-transparent w-[90px] text-base text-white-50 font-medium cursor-pointer outline-none"
                      />
                      <p className="text-base text-white-50 font-medium px-2">
                        -
                      </p>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => handleEndDateChange(date)}
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        className="bg-transparent w-24 text-base text-white-50 font-medium cursor-pointer outline-none"
                      />
                    </div>
                    <CustomSelect
                      h="34px"
                      w="230px"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Método de pagamento</option>
                      <option value="bank_slip">Boleto</option>
                      <option value="bank_transfer">
                        Transferência bancária
                      </option>
                      <option value="credit_card">Cartão de crédito</option>
                      <option value="debit_card">Cartão de débito</option>
                      <option value="pix">PIX</option>
                    </CustomSelect>
                    <CustomSelect
                      h="34px"
                      w="230px"
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
                      <option value="chargeback_requested">
                        Estorno solicitado
                      </option>
                      <option value="chargeback_refused">
                        Estorno recusado
                      </option>
                      <option value="chargeback">Estornado</option>
                      <option value="refund_requested">
                        Reembolso solicitado
                      </option>
                      <option value="refund_refused">Reembolso recusado</option>
                      <option value="refunded">Reembolsado</option>
                      <option value="gateway_error">Erro de gateway</option>
                      <option value="system_error">Erro de sistema</option>
                    </CustomSelect>
                    <CustomSelect
                      h="34px"
                      w="230px"
                      onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                      <option value="">Status do pagamento</option>
                      <option value="awaiting_payment">
                        Aguardando pagamento
                      </option>
                      <option value="payment_received">
                        Pagamento recebido
                      </option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="expired">Expirado</option>
                      <option value="open_dispute">Disputa aberta</option>
                    </CustomSelect>
                    <CustomSelect
                      h="34px"
                      w="230px"
                      onChange={(e) => setShippingStatus(e.target.value)}
                    >
                      <option value="">Status de envio</option>
                      <option value="awaiting_shipment">
                        Aguardando envio
                      </option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregue</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="returned">Retornado</option>
                    </CustomSelect>
                  </div>
                  <div className="flex flex-col justify-end items-end mt-10">
                    <Button
                      onClick={() => setOpen(false)}
                      size="150px"
                      h="48px"
                      type="button"
                      variant="primary"
                    >
                      <span className="text-lg font-medium text-white-50">
                        Filtrar
                      </span>
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FilterModal;
