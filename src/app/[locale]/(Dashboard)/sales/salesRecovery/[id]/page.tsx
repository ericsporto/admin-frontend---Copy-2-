'use client';
import { useTranslations } from 'next-intl';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { MdPerson, MdContentCopy } from 'react-icons/md';
import { Button } from '@/components/Global/Button';
import Image from 'next/image';
import { SiWhatsapp } from 'react-icons/si';

export default function SalesRecoveryDetails() {
  const t = useTranslations('Home');

  return (
    <main className="w-full flex flex-col justify-between items-start xl:px-2 py-3 gap-7">
      <div className="flex flex-col xl:flex-row justify-between items-center w-full">
        <h1 className="text-green-50 text-2xl font-bold my-4 xl:my-0">
          Detalhes da Recuperação
        </h1>
        <div className="flex gap-4">
          <div className="w-[402px] xl:w-[300px]">
            <Button variant="fifth" size="100%" h="40px">
              {' '}
              <MdContentCopy size={24} />
              <span className="text-base font-medium">Link de Recovery</span>
            </Button>
          </div>
          <div className="w-[402px] xl:w-[300px]">
            <Button variant="fifth" size="100%" h="40px">
              {' '}
              <SiWhatsapp size={24} />
              <span className="text-base font-medium">Link de Recovery</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between w-full gap-6">
        <aside className="w-full xl:w-[70%] flex flex-col">
          <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between p-8">
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="text-green-50 text-base font-medium">
                  Valor da venda
                </h2>
                <h1 className=" text-white-50 text-2xl font-bold">
                  R$4.000,00
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-gray-50 text-sm font-medium">Status</h3>
                <div className="mt-1 xl:mt-0">
                  {/*  <span className="flex items-center w-fit justify-center rounded-[10px] bg-green-50 p-3 h-4 text-[13px] font-medium text-white-50">
                    Aprovado
                  </span> */}
                  <span className="flex items-center w-fit justify-center rounded-[10px]   bg-red-100 p-3 h-4 text-[13px] font-medium text-white-50">
                    Não recuperado
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between xl:justify-start gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  ID Transação
                </p>
                <h1 className="text-white-50 text-base font-medium">
                  00000000
                </h1>
              </div>
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Data de criação
                </p>
                <h1 className="text-white-50 text-base font-medium">
                  14 de dez. 12:30
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] bg-gray-200 justify-between mt-8 p-8">
            <div className="flex justify-between items-center w-full">
              <div>
                <h3 className="text-white-50 text-base font-medium">Cliente</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-green-50 text-white-50 rounded-[10px] px-2.5 py-2 text-[15px] font-bold">
                    CE
                  </div>
                  <div>
                    <h1 className=" text-white-50 text-[15px] font-medium">
                      Client Example
                    </h1>
                    <p className=" text-gray-50 text-xs font-light">
                      clientemail@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center justify-start gap-6 xl:gap-12 mt-8">
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  CPF/CNPJ
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  000.000.000-00
                </h1>
              </div>
              <div className="flex flex-col items-start">
                <p className="flex items-end text-gray-50 text-sm font-medium">
                  Telefone
                </p>
                <h1 className="text-white-50 text-[15px] font-medium">
                  +00 00 00000-00000
                </h1>
              </div>
            </div>
            <div className="flex w-full justify-end mt-8 xl:mb-2">
              <div className="w-[342px] xl:w-[300px]">
                <Button variant="fifth" size="100%" h="40px">
                  {' '}
                  <MdPerson className="w-6 h-6" />
                  <span className="text-base font-bold">Ver cliente</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>
        <aside className="w-full xl:w-[30%]">
          <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between p-8">
            <h1 className="text-white-50 text-base font-medium">Carrinho</h1>
            <div className="mt-4 flex items-center justify-start gap-4">
              <div className="bg-gray-50 w-[60px] xl:w-[65px] h-[60px] xl:h-[65px] rounded-[10px]"></div>
              <div className="w-[70%]">
                <p className="text-gray-50 text-sm font-medium">
                  Product tittle example + subtitle example
                </p>
                <p className="text-gray-50 text-sm font-medium">R$4.000,00</p>
                <p className="text-gray-50 text-sm font-medium">Qtd.: 1</p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-gray-200 flex flex-col justify-between mt-8 p-8">
            <h1 className="text-white-50 text-sm font-medium">Taxas</h1>
            <div className="mt-4 flex flex-col items-start gap-2">
              <div className="flex justify-between items-center w-full">
                <p className="flex items-end text-gray-50 text-xs font-medium">
                  Valor Bruto
                </p>
                <p className="flex items-end text-gray-50 text-xs font-medium">
                  R$4.000,00
                </p>
              </div>
              <div className="flex justify-between items-center w-full mt-2">
                <p className="flex items-end text-gray-50 text-xs font-medium">
                  Taxa Intermediação
                </p>
                <p className="flex items-end text-gray-50 text-xs font-medium">
                  R$100,00
                </p>
              </div>
              <div className="flex justify-between items-center w-full mt-2">
                <h1 className="flex items-end text-white-50 text-[15px] font-medium">
                  Valor líquido
                </h1>
                <div className="flex items-center">
                  <p className="flex items-end text-white-50 text-[10px] font-medium mt-1 xl:mt-0">
                    aprox.
                  </p>
                  <h1 className="flex items-end text-green-50 text-[15px] font-medium">
                    R$3.900,00
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
