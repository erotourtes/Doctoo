import { cn } from '../../../utils/cn';
import { ButtonTypes } from './ButtonTypes';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  type: `${ButtonTypes}`;
};

export const Button = ({ children, onClick, disabled = false, className = '', type }: ButtonProps) => {
  const ButtonTypeStyles = {
    [ButtonTypes.PRIMARY]: `text-white ${disabled ? 'bg-grey-3' : 'bg-main hover:bg-main-dark active:bg-main-darker'}`,
    [ButtonTypes.SECONDARY]: `bg-transparent border-2 ${disabled ? 'border-grey-3 text-grey-3' : 'border-main text-main hover:border-main-dark hover:text-main-dark active:border-main-darker active:text-main-darker'}`,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(ButtonTypeStyles[ButtonTypes[type]], 'h-10 min-w-[100px] rounded-md px-6', className)}
    >
      {children}
    </button>
  );
};
