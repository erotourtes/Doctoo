import React from 'react';
import Icon from '../../icons/Icon';

interface InputProps {
  id?: string;
  name: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  valid?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  iconVariant: 'warning' | 'valid';
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  className,
  id,
  name,
  placeholder,
  iconVariant,
  valid,
  classNameLabel,
  value,
  setValue,
  error,
}) => {
  return (
    <div className=''>
      {label && (
        <label htmlFor={id || name} className={`text-md my-2 block text-grey-1 ${classNameLabel}`}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          className={`h-10 cursor-pointer rounded-lg  border px-4 py-2 text-base leading-6 text-text ${!valid ? 'border-error' : 'border-transparent'} hover:${!valid ? 'border-error' : 'border-green-border'} focus:${!valid ? 'border-error' : 'border-green-border'} focus:outline-none ${className}`}
          placeholder={placeholder}
        />
        {valid && type !== 'email' && (
          <Icon
            variant='valid'
            className='absolute right-3 top-1/2 size-[24px] -translate-y-1/2 transform cursor-pointer text-main'
          />
        )}
        {!valid && (
          <React.Fragment>
            <Icon
              variant='warning'
              className='absolute right-3 top-[21px] size-[20px] -translate-y-1/2 transform cursor-pointer text-error'
            />
            <p className='text-error'>{error || 'Validation error'}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Input;
