interface RadioButtonProps {
  label: string;
  onClick: () => void;
  checked: boolean;
  disabled?: boolean;
  id: string;
}

export const RadioButton = ({ label, checked, onClick, disabled, id }: RadioButtonProps) => {
  return (
    <label
      className={`flex cursor-pointer items-center ${disabled ? 'cursor-not-allowed text-grey-4' : 'cursor-pointer'}`}
    >
      <div
        className={`relative h-6 w-6 cursor-pointer rounded-full  
          ${disabled ? 'cursor-not-allowed border border-grey-4 ' : checked ? 'border-2 border-main' : 'border border-main hover:border-2 hover:border-main focus:border-2 focus:border-main'} 
          `}
      >
        <div
          className={`cursor-pointer rounded-full ${disabled ? 'cursor-not-allowed bg-grey-4 ' : checked ? 'bg-main' : 'bg-white'}`}
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
          className={`absolute cursor-pointer opacity-0 ${disabled ? 'cursor-not-allowed' : ''}`}
          checked={checked}
          onChange={onClick}
          disabled={disabled}
        />
      </div>
      <span className={`ml-2 text-${disabled ? 'grey-4' : 'text'}`}>{label}</span>
    </label>
  );
};
