import React, { ChangeEvent } from 'react';
import Icon from '../../icons/Icon';

interface InputProps {
  id?: string;
  type: string;
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

const Input = ({
  id,
  type,
  name,
  value,
  setValue,
  label,
  placeholder,
  className,
  classNameLabel,
  valid,
  error,
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className='flex flex-col items-start'>
      {label && (
        <label htmlFor={id || name} className={`text-md my-2 block text-grey-1`}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
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
              variant='valid'
              className='absolute right-3 top-[21px] size-[24px] -translate-y-1/2 transform cursor-pointer text-main'
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
