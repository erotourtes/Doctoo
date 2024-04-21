import { cn } from '../../../utils/cn';

export interface RadioButtonProps {
  label: string;
  name: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  value?: string;
}

export const RadioButton = ({ label, onClick, disabled, name, value, selected }: RadioButtonProps) => {
  return (
    <label
      className={cn(disabled ? 'cursor-not-allowed text-grey-4' : 'cursor-pointer', 'flex cursor-pointer items-center')}
    >
      <div
        className={cn(
          disabled
            ? 'cursor-not-allowed border border-grey-4'
            : selected
              ? 'border-2 border-main'
              : 'border border-main hover:border-2 hover:border-main focus:border-2 focus:border-main',
          'relative h-6 w-6 cursor-pointer rounded-full',
        )}
      >
        <div
          className={cn(
            disabled ? 'cursor-not-allowed bg-grey-4 ' : selected ? 'bg-main' : 'bg-white',
            'cursor-pointer rounded-full',
          )}
          style={{
            width: '14px',
            height: '14px',
            position: 'relative',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
          }}
        ></div>
        <input
          type='radio'
          id={`radiobutton-${label}`}
          name={name}
          value={value || label}
          className={cn(disabled ? 'cursor-not-allowed' : '', 'absolute cursor-pointer opacity-0')}
          checked={selected}
          disabled={disabled}
          onChange={onClick}
        />
      </div>
      <span className={cn(`text-${disabled ? 'grey-4' : 'text'}`, 'ml-2')}>{label}</span>
    </label>
  );
};
