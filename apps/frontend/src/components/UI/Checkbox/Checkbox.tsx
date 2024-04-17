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
        className='appearance-none w-6 h-6 grid place-content-center cursor-pointer p-1 border rounded border-solid border-main bg-white hover:(not disabled:border-2) focus:(not disabled:border-2) before:content-[""] before:bg-[url("/assets/checkmark.svg")]  before:w-6 before:h-6 before:transition-[120ms] before:duration-[transform] before:scale-0 checked:bg-main checked:before:scale-100 checked:hover:bg-main-dark checked:hover:border-main-dark checked:disabled:bg-grey-4 disabled:border-grey-4 disabled:cursor-not-allowed'
        disabled={disabled}
      />
      <p className={`text-base font-normal leading-6 ${disabled ? 'text-grey-4' : 'text-text'}`}>
        {text}
      </p>
    </div>
  );
};
