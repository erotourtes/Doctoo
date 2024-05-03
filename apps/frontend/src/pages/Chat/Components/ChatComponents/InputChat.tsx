import { Button, Icon } from '@/components/UI';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState, useEffect } from 'react';

interface InputChatProps {
  className?: string;
  inputValue?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSend?: () => void;
}

const InputChat: React.FC<InputChatProps> = ({
  className,
  inputValue = '',
  handleChange = () => {},
  onSend = () => {},
}) => {
  const [localInputValue, setLocalInputValue] = useState<string>('');

  useEffect(() => {
    setLocalInputValue(inputValue);
  }, [inputValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalInputValue(e.target.value);
    handleChange(e);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localInputValue.trim() !== '') {
      onSend();
    }
  };

  const selectFile = () => {};

  return (
    <div className={'flex w-full items-center gap-2 bg-white px-6 py-4 ' + className}>
      <div className='group relative cursor-pointer'>
        <input onChange={selectFile} type='file' className='z-1 absolute inset-0 opacity-0' />
        <Icon variant='attach' className='pointer-events-none text-grey-2 group-hover:text-grey-1' />
      </div>

      <input
        type='text'
        value={localInputValue}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder='Write a message...'
        className='text-gray-2 w-full flex-1 text-sm font-medium focus:outline-none'
      />

      <Button
        btnType='button'
        type='primary'
        disabled={localInputValue.trim() === ''}
        className='size-10 min-w-10 p-2'
        onClick={onSend}
      >
        <Icon variant='send-message' className='text-white' />
      </Button>
    </div>
  );
};

export default InputChat;
