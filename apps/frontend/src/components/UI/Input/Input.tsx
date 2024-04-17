import { ReactNode,  ChangeEvent } from 'react';

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
      <label htmlFor={label} className='text-md text-grey-2 my-2 block h-6'>
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        className={`${className} text-text border-green-border h-10 cursor-pointer rounded-lg px-4 py-2 text-base leading-6 focus:border focus:outline-none`}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default Input;