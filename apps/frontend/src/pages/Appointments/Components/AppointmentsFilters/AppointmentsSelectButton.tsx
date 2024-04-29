import { useState } from 'react';
import { Icon } from '@/components/UI';

interface AppointmentsSelectButtonProps {
  defaultOption: string;
  setChosenOption: (value: 'Oldest to latest' | 'Latest to oldest') => void;
}

const AppointmentsSelectButton = ({ defaultOption, setChosenOption }: AppointmentsSelectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: 'Oldest to latest' | 'Latest to oldest') => {
    setSelectedOption(option);
    setChosenOption(option);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='flex w-[130px] cursor-pointer items-center gap-3 rounded-full bg-white p-0.5 pl-3 text-sm text-black hover:bg-grey-5 hover:text-main'
        onClick={handleClick}
      >
        {selectedOption}
        <Icon variant={`shevron-mini-${isOpen ? 'open' : 'closed'}`} className='h-6 w-6 text-grey-3' />
      </button>

      {isOpen && (
        <div className='absolute mb-5 mt-2 flex w-[224px] justify-end rounded-md bg-white'>
          <div className='h- mr-1 mt-4 w-[210px]'>
            <ul className='cursor-pointer'>
              <li
                className={`mb-1 w-full rounded-md bg-white p-1 pl-3 text-left text-sm text-grey-1 hover:text-main`}
                onClick={() => handleOptionClick('Oldest to latest')}
              >
                Oldest to latest
              </li>
              <li
                className={`mb-1 w-full rounded-md bg-white p-1 pl-3 text-left text-sm text-grey-1 hover:text-main`}
                onClick={() => handleOptionClick('Latest to oldest')}
              >
                Latest to oldest
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsSelectButton;
