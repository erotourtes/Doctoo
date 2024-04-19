import React, { useState } from 'react';
import Icon from '../../icons/Icon';

interface InputPasswordProps {
  id?: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  valid: boolean;
  error?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  label,
  className,
  id,
  name,
  placeholder,
  value,
  setValue,
  classNameLabel,
  valid,
  error,
}: InputPasswordProps) => {
  const [inputType, setInputType] = useState('password');

  const handleTogglePassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='flex flex-col items-start'>
      {label && (
        <label htmlFor={id || name} className={`text-md block text-grey-2 my-1 ${classNameLabel}`}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          className={`h-10 cursor-pointer rounded-lg bg-background px-4 py-2 text-base leading-6 text-text ${!valid && 'border border-error'} hover:${!valid ? 'border border-error' : 'border border-green-border'} focus:${!valid ? 'border border-error' : 'border border-green-border'} focus:outline-none ${className}`}
          placeholder={placeholder}
        />
        {!valid ? (
          <>
            <Icon
              variant='warning'
              className='absolute right-3 top-[21px] size-[20px] -translate-y-1/2 transform cursor-pointer text-error'
            />
            <p className='my-1 text-left text-error'>{error || 'Validation error'}</p>
          </>
        ) : (
          <button>
            <Icon
              variant={inputType === 'password' ? 'eye-closed' : 'eye-open'}
              className='absolute right-3 top-[21px] size-[24px] -translate-y-1/2 transform cursor-pointer text-grey-2'
              onClick={handleTogglePassword}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputPassword;
