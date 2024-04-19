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
  error
}) => {
  const [inputType, setInputType] = useState('password');

  const handleTogglePassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='bg-grey-5'>
      {label && (
        <label htmlFor={id || name} className={`text-md block text-grey-2 ${classNameLabel}`}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          className={`h-10 cursor-pointer rounded-lg border-green-border px-4 py-2 text-base leading-6 text-text hover:border focus:border focus:outline-none ${className}`}
          placeholder={placeholder}
        />
        {!valid ? (
          <React.Fragment>
            <Icon
              variant='warning'
              className='text-gray-600 absolute right-3 top-1/2 size-[20px] -translate-y-1/2 transform cursor-pointer'
            />
            <p>{error || 'Validation error'}</p>
          </React.Fragment>
        ) : (
          <button>
            <Icon
              variant={inputType === 'password' ? 'eye-closed' : 'eye-open'}
              className='text-gray-600 absolute right-3 top-1/2 size-[24px] -translate-y-1/2 transform cursor-pointer'
              onClick={handleTogglePassword}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputPassword;
