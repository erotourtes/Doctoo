import type React from 'react';
import { useState } from 'react';
import Icon from '../Icon/Icon';

interface SelectProps {
  id: string;
  options: string[];
  defaultOption?: string | '';
  onChange: (value: string) => void;
  label?: string;
  classNameLabel?: string;
}

const Select: React.FC<SelectProps> = ({ options, defaultOption, label, id, classNameLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || '');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      {label && (
        <label htmlFor={id} className={`${classNameLabel || ''} text-md my-2 block text-grey-2`}>
          {label}
        </label>
      )}
      <button
        className='flex h-9 w-[412px]  cursor-pointer items-center justify-between 
        rounded-md bg-grey-5 p-3 text-sm text-black hover:bg-grey-4'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || 'Select'}
        <Icon variant={`shevron-mini-${isOpen ? 'open' : 'closed'}`} className='h-6 w-6 text-grey-3' />
      </button>

      {isOpen && (
        <div className='absolute w-[412px] rounded-md bg-grey-5 mt-0.5'>
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`mb-1 first:mt-2 w-full cursor-pointer rounded-md bg-grey-5 p-1
                pl-3 text-left text-${selectedOption === option ? 'main' : 'grey-1'} text-sm hover:bg-grey-4 hover:text-main
              `}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
