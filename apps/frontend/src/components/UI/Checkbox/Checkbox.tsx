import { cn } from '../../../utils/cn';

interface CheckboxProps {
  text: string;
  disabled?: boolean;
}

export const Checkbox = ({ text, disabled = false }: CheckboxProps) => {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        id='checkbox'
        className='hover:(not disabled:border-2) focus:(not disabled:border-2) grid h-6 w-6 cursor-pointer appearance-none place-content-center rounded border border-solid border-main bg-white p-1 before:h-6 before:w-6  before:scale-0 before:bg-[url("/assets/checkmark.svg")] before:transition-[120ms] before:duration-[transform] before:content-[""] checked:bg-main checked:before:scale-100 checked:hover:border-main-dark checked:hover:bg-main-dark disabled:cursor-not-allowed disabled:border-grey-4 checked:disabled:bg-grey-4'
        disabled={disabled}
      />
      <p className={cn('text-base font-normal leading-6', disabled ? 'text-grey-4' : 'text-text')}>{text}</p>
    </div>
  );
};
