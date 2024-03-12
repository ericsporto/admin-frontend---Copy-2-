import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  checked: boolean;
  description: string;
}

export const Switch = ({ name, checked, description, ...props }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={name}
        className="relative inline-flex items-center cursor-pointer "
      >
        <input
          id={name}
          name={name}
          checked={checked}
          {...props}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-[45px] h-[22px] bg-gray-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[3px] after:bg-white-100 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-100"></div>
      </label>
      <p className="text-white-100 text-sm font-normal">{description}</p>
    </div>
  );
};
