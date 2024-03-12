'use client';
import {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import SpanError from './SpanError';
import { MdOutlineUploadFile } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  iconPosition?: 'left' | 'right';
  id?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type: HTMLInputTypeAttribute;
  textColor?: string;
  register?: UseFormRegisterReturn;
  errorType?: FieldError;
  messageError?: string;
  whitePlaceholder?: boolean;
  label?: string;
  labelSpan?: string;
  labelFontSize?: string;
  placeholderFontSize?: string;
  bg?: string;
  h?: string;
  w?: string;
  selectedFileName?: string;
  setSelectedFileName?: Dispatch<SetStateAction<string>>;
  labelColor?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const CustomInput = ({
  placeholder,
  iconPosition,
  icon,
  type,
  textColor,
  register,
  disabled,
  id,
  errorType,
  messageError,
  whitePlaceholder,
  label,
  labelSpan,
  labelFontSize,
  placeholderFontSize,
  bg,
  h,
  w,
  selectedFileName,
  labelColor,
  setSelectedFileName = () => '',
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (!disabled) {
      setShowPassword((state) => !state);
    }
  };

  const handleFileChange = () => {
    const fileInput = document.getElementById(id!) as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setSelectedFileName(fileInput.files[0].name);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <div
      style={{
        width: w ? w : '',
      }}
      className="flex flex-col w-full "
    >
      {label && (
        <div className="pb-1">
          <label
            htmlFor={label}
            className="font-medium text-white-50"
            style={{
              fontSize: labelFontSize ?? '16px',
              color: labelColor ? labelColor : ''
            }}

          >
            {label}
            <span className="text-sm text-gray-50">{labelSpan}</span>
          </label>
        </div>
      )}
      <div
        style={{
          height: h ? h : '',
        }}
        className={classNames(
          'relative p-4 rounded-[10px] flex items-center justify-start space-x-1 border border-gray-50 gap-2 w-full h-16 ',
          !whitePlaceholder ? '' : 'h-[58px]',
          type === 'file' ? 'cursor-pointer' : '',
          bg ? bg : ''
        )}
      >
        {icon && iconPosition === 'left' && (
          <span className="text-gray-50">{icon}</span>
        )}
        {type !== 'file' && (
          <input
            accept=".pdf,.png,.jpg,.jpeg"
            placeholder={placeholder}
            type={
              type === 'password' && !showPassword
                ? type
                : type === 'password' && showPassword
                ? 'text'
                : type
            }
            id={id}
            className={classNames(
              'text-base font-normal appearance-none w-[83%] bg-inherit outline-none  placeholder:font-medium',
              !whitePlaceholder
                ? 'placeholder:text-gray-50'
                : 'placeholder:text-gray-400 w-full',
              placeholderFontSize
                ? `placeholder:${placeholderFontSize}`
                : 'text-base'
            )}
            style={{ color: textColor ?? 'black' }}
            disabled={disabled}
            {...register}
            {...rest}
          />
        )}
        {type === 'file' && (
          <label htmlFor={id} className="w-full">
            <input
              accept=".jpg, .jpeg, .png, .pdf"
              type={type}
              id={id}
              onChange={handleFileChange}
              className={classNames(
                'text-base font-normal appearance-none w-full bg-inherit outline-none opacity-0 cursor-pointer',
                placeholderFontSize ? `placeholder:${placeholderFontSize}` : ''
              )}
              disabled={disabled}
              {...register}
              {...rest}
            />
            <div
              className={classNames(
                'opacity-0 pb-7 text-gray-50',
                selectedFileName && 'opacity-100'
              )}
            >
              {selectedFileName}
            </div>
          </label>
        )}
        {showPassword && type === 'password' ? (
          <IoMdEyeOff
            onClick={handleShowPassword}
            className="w-6 h-6 cursor-pointer text-gray-50"
          />
        ) : !showPassword && type === 'password' ? (
          <IoMdEye
            onClick={handleShowPassword}
            className="w-6 h-6 cursor-pointer text-gray-50"
          />
        ) : null}
        {!selectedFileName && type === 'file' ? (
          <MdOutlineUploadFile
            onClick={handleFileChange}
            className="w-6 h-6 cursor-pointer text-white-50"
          />
        ) : selectedFileName && type === 'file' ? (
          <ImCancelCircle
            onClick={handleFileChange}
            className="w-6 h-6 cursor-pointer text-red-100"
          />
        ) : null}
        {icon && iconPosition === 'right' && (
          <span className="text-gray-50 pr-2">{icon}</span>
        )}
      </div>
      {errorType && <SpanError message={messageError} />}
    </div>
  );
};
