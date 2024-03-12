'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: string;
  h?: string;
  disabled?: boolean;
  onClick?: () => void;
  styles?: string;
  variant?: string;
}

export const Button = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, variant, ...rest } =
    props;
  switch (variant) {
    case 'primary':
      return <ButtonPrimary {...props} />;
    case 'secondary':
      return <ButtonSecondary {...props} />;
    case 'tertiary':
      return <ButtonTertiary {...props} />;
    case 'quaternary':
      return <ButtonQuaternary {...props} />;
    case 'fifth':
      return <ButtonFifth {...props} />;
    case 'sixth':
      return <ButtonSixth {...props} />;
    case 'seventh':
      return <ButtonSeventh {...props} />;
  }

  return <ButtonPrimary {...props} />;
};

export const ButtonPrimary = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-green-100 rounded-[10px] text-sm gap-2 hover:bg-gradient-to-b hover:from-[#00D074] hover:to-[#149E61] ease-in duration-200 text-white-100 font-semibold outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-transparent rounded-[10px] text-xl font-medium border-2 border-green-50 text-green-50 gap-2 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonTertiary = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-transparent rounded-[10px] border border-gray-50 text-gray-50 font-semibold text-sm gap-2 hover:border-green-50 hover:text-green-50 ease-in duration-200 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonQuaternary = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-gray-50 rounded-[10px] text-xl font-medium border-2 border-gray-50 text-white-50 gap-2 ease-in duration-200 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};
export const ButtonFifth = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-transparent rounded-[10px] text-xl font-medium border border-white-50 text-white-50 hover:bg-gray-50 gap-2 ease-in duration-200 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};
export const ButtonSixth = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-transparent rounded-[10px] text-xl font-medium border border-red-100 text-red-100 hover:bg-red-300 gap-2 ease-in duration-200 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};
export const ButtonSeventh = (props: ButtonProps) => {
  const { styles, children, size, h, disabled, onClick, ...rest } = props;

  return (
    <button
      style={{
        width: size ? size : '130px',
        height: h ? h : '40px',
      }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center disabled:cursor-not-allowed disabled:opacity-30 items-center bg-red-100 rounded-[10px] text-xl font-medium border-none text-white-50 hover:bg-red-700 gap-2 ease-in duration-200 outline-none focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};
