import React, { ReactNode, SelectHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { MdArrowDropDown } from 'react-icons/md';
import SpanError from './SpanError';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  h?: string;
  w?: string;
  label?: string;
  labelFontSize?: string;
  register?: UseFormRegisterReturn;
  errorType?: FieldError;
  messageError?: string;
  textColor?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  children,
  h,
  w,
  label,
  labelFontSize,
  errorType,
  messageError,
  register,
  textColor,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={label}
          className="font-medium text-white-50 pb-2"
          style={{ fontSize: labelFontSize ?? '16px' }}
        >
          {label}
        </label>
      )}
      <div className="relative inline-block" style={{width: w ? w : '100%'}}>
        <select
          {...props}
          {...register}
          className="appearance-none bg-transparent border border-gray-50 rounded-[10px] px-2 py-1 leading-tight focus:outline-none focus:shadow-outline w-full pl-4 text-sm"
          style={{
            height: h ? h : '58px',
            width: w ? w : '100%',
            color: textColor ?? 'white'
          }}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <MdArrowDropDown className="text-gray-50" />
        </div>
      </div>
      {errorType && <SpanError message={messageError} />}
    </div>
  );
};

export default CustomSelect;
