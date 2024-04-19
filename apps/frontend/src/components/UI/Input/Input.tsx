import type { ChangeEvent, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

interface InputProps {
  type: string;
  label?: string;
  placeholder: string;
  className?: string;
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, label, className, placeholder, children, onChange }) => {
  return (
    <div>
      <label htmlFor={label} className='text-md my-2 block h-6 text-grey-2'>
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        className={cn(
          className,
          'h-10 cursor-pointer rounded-lg border-green-border px-4 py-2 text-base leading-6 text-text focus:border focus:outline-none',
        )}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default Input;
