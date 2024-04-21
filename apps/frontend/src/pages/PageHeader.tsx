import type React from 'react';
import Icon from '../components/icons/Icon';
import type { IconVariant } from '../components/icons/types';

type PageHeaderProps = {
  iconVariant: IconVariant;
  title: string;
  children?: React.ReactNode;
};

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ iconVariant, title, children }) => {
  return (
    <div className='mb-5 flex w-full justify-between'>
      <div className='flex items-center gap-3'>
        <Icon variant={iconVariant} className='size-[24px] text-main' />
        <h2 className='text-2xl font-medium text-black'>{title}</h2>
      </div>

      {children ? <div className='flex items-center gap-3'>{children}</div> : null}
    </div>
  );
};

export default PageHeader;
