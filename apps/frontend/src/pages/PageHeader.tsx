import type React from 'react';
import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';
import { cn } from '@/utils/cn';

type PageHeaderProps = {
  iconVariant: IconVariant;
  title: string;
  children?: React.ReactNode;
  className?: string;
};

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ iconVariant, title, children, className }) => {
  return (
    <div className={cn(className || '', 'mb-6 flex w-full justify-between')}>
      <div className='flex items-center gap-3'>
        <Icon variant={iconVariant} className='size-[24px] text-main' />
        <h2 className='text-2xl font-medium text-black'>{title}</h2>
      </div>

      {children ? <div className='flex items-center gap-3'>{children}</div> : null}
    </div>
  );
};

export default PageHeader;
