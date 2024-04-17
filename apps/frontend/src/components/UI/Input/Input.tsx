interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: () => void;
}

export const Input = ({ type, label, className, placeholder }: InputProps) => {
  return (
    <div>
      <label htmlFor={label} className='my-2 block text-sm text-gray-400'>
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        className={`rounded-md px-4 py-3 text-sm text-gray-600 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
