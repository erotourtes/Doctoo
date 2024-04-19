import { useFormContext } from 'react-hook-form';
import Icon from '@components/icons/Icon';

interface InputProps {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
}

const Input = ({
  id,
  type,
  label,
  placeholder,
  defaultValue,
  errorMessage,
  className,
  classNameInput,
  classNameLabel,
}: InputProps) => {
  const {
    register,
    formState: { errors, dirtyFields, isValid },
  } = useFormContext();

  const hasError = errors[id];
  const isDirty = id in dirtyFields;

  return (
    <div className={`${className || ''} grid`}>
      {label && (
        <label htmlFor={id} className={`${classNameLabel || ''} text-md my-2 block text-grey-1`}>
          {label}
        </label>
      )}
      <div className='grid'>
        <input
          {...register(id)}
          type={type}
          placeholder={placeholder}
          className={`${classNameInput || ''} col-start-1 row-start-1 w-full rounded-lg bg-background py-2 pl-4 pr-10 text-base text-text hover:border focus:border focus:outline-none ${hasError && 'border border-solid border-error'}`}
          defaultValue={defaultValue}
        />

        {isDirty && !hasError && !isValid && (
          <button type='reset' className='col-start-1 row-start-1 mr-2 self-center justify-self-end'>
            <Icon variant='close' />
          </button>
        )}

        {hasError && (
          <Icon variant='warning' className='col-start-1 row-start-1 mr-2 self-center justify-self-end text-error' />
        )}

        {defaultValue && !hasError && !isDirty && (
          <Icon variant='valid' className='col-start-1 row-start-1 mr-2 self-center justify-self-end text-main' />
        )}
      </div>

      {hasError && errorMessage && <p className='mt-2 text-sm font-normal leading-[17px] text-error'>{errorMessage}</p>}
    </div>
  );
};

export default Input;
