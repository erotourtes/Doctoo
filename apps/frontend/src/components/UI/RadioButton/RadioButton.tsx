import { cn } from '../../../utils/cn';

interface RadioButtonProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  id: string;
  onClick: () => void;
}

export const RadioButton = ({ label, checked, onClick, disabled, id }: RadioButtonProps) => {
  return (
    <label
      className={cn(disabled ? 'cursor-not-allowed text-grey-4' : 'cursor-pointer', 'flex cursor-pointer items-center')}
    >
      <div
        className={cn(
          disabled
            ? 'cursor-not-allowed border border-grey-4'
            : checked
              ? 'border-2 border-main'
              : 'border border-main hover:border-2 hover:border-main focus:border-2 focus:border-main',
          'relative h-6 w-6 cursor-pointer rounded-full',
        )}
      >
        <div
          className={cn(
            disabled ? 'cursor-not-allowed bg-grey-4 ' : checked ? 'bg-main' : 'bg-white',
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
          id={id}
          className={cn(disabled ? 'cursor-not-allowed' : '', 'absolute cursor-pointer opacity-0')}
          checked={checked}
          onChange={onClick}
          disabled={disabled}
        />
      </div>
      <span className={cn(`text-${disabled ? 'grey-4' : 'text'}`, 'ml-2')}>{label}</span>
    </label>
  );
};
