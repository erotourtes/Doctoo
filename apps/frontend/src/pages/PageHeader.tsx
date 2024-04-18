import React from 'react'
import { IconVariant } from '../components/icons/types';
import Icon from '../components/icons/Icon';

type PageHeaderProps = {
  iconVariant: IconVariant,
  title: string,
  children?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({iconVariant, title, children }) => {
  return (
    <div className='flex w-full justify-between'>
      <div className="flex items-center gap-3">
        <Icon variant={iconVariant} className='text-main size-[24px]'/>
        <h2 className='text-2xl text-black font-medium'>{title}</h2>
      </div>

      {children ? (
        <div className="flex items-center gap-3">{children}</div>
      ) : null}
    </div>
  )
}

export default PageHeader