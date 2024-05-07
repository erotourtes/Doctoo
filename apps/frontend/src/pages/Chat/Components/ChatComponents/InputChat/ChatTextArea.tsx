import { cn } from '@/utils/cn';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

type ChatTextAreaProps = {
  value?: string;
  handleEnterPress?: (value: string) => void;
  handleChange?: (value: string) => void;
  className?: string;
};

const ChatTextArea = ({
  value = '',
  className = '',
  handleChange = () => {},
  handleEnterPress = () => {},
}: ChatTextAreaProps) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    setTextAreaValue(value);
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    handleChange(e.target.value);
    changeHeightTextArea(e.target);
  };

  const changeHeightTextArea = (textarea: HTMLTextAreaElement) => {
    const heightTextArea = textarea.scrollHeight;
    if (heightTextArea < 120) {
      textarea.style.height = '';
      textarea.style.height = textarea.scrollHeight + 2 + 'px';
    }
    if (textarea.value === '') {
      textarea.style.height = '';
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.key === 'Enter' && e.shiftKey) && e.key === 'Enter') {
      e.preventDefault();
      handleEnterPress(textAreaValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.key === 'Enter' && e.shiftKey) && e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
    }
  };

  return (
    <textarea
      value={textAreaValue}
      onChange={onChange}
      placeholder='Write a message...'
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      className={cn(
        'text-gray-2 h-5 max-h-64 w-full flex-1 resize-none self-center overflow-y-auto text-sm font-medium focus:outline-none',
        className,
      )}
    />
  );
};

export default ChatTextArea;
