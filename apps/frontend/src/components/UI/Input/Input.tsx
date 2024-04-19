import React, { forwardRef, ChangeEvent, Ref, InputHTMLAttributes } from 'react';
import Icon from '../../icons/Icon';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  error?: string;
  register: (rules?: RegisterOptions) => UseFormRegisterReturn;
  name: string;
}

const Input = forwardRef(
  (
    {
      type,
      label,
      className,
      id,
      name,
      placeholder,
      value,
      setValue,
      error,
      register,
      ...rest
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
    };

    return (
      <div className="flex flex-col items-start">
        {label && (
          <label
            htmlFor={id || name}
            className={`text-md my-2 block text-grey-1`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id || name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            className={`h-10 cursor-pointer rounded-lg px-4 py-2 bg-background text-base leading-6 text-text border focus:outline-none ${className}`}
            placeholder={placeholder}
            {...rest}
            {...register} // Register the input with the provided register function
          />
          {error && (
            <>
              <Icon
                variant="warning"
                className="absolute right-3 top-[21px] size-[20px] -translate-y-1/2 transform cursor-pointer text-error"
              />
              <p className="text-error my-1 text-left">{error}</p>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
