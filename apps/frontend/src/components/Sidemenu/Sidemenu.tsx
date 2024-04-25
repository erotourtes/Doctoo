import useWindowWide from '@/hooks/useWindowWide';
import type React from 'react';
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import NavLogo from '@UI/NavLogo/NavLogo';

type SidemenuProps = {
  variant?: 'small' | 'large';
};

const Sidemenu: React.FunctionComponent<SidemenuProps> = ({ variant = 'large' }) => {
  const mn768 = useWindowWide(768);
  const variantSize = variant === 'small' ? 'small' : mn768 ? 'large' : 'small';
  const location = useLocation();

  const getSelected = (to: string) => {
    return location.pathname.startsWith(to);
  };

  return (
    <nav
      className={`sidemenu relative flex flex-col bg-main p-8 ${variantSize === 'large' ? 'w-72 items-stretch gap-8 p-8 pt-12' : 'w-20 items-center gap-[30px] p-4 pt-11'} h-full shrink-0`}
    >
      <NavLogo variant={variantSize} />

      <div className='menu flex flex-1 flex-col gap-4'>
        <NavButton
          to={'/dashboard'}
          iconVariant='dashboard'
          text='Dashboard'
          variant={variantSize}
          selected={getSelected('/dashboard')}
        />
        <NavButton
          to={'/appointments'}
          iconVariant='appointments'
          text='Appointments'
          variant={variantSize}
          selected={getSelected('/appointments')}
        />
        <NavButton
          to={'/my-doctors'}
          iconVariant='my-doctors'
          text='My doctors'
          variant={variantSize}
          selected={getSelected('/my-doctors')}
        />
        <NavButton
          to={'/chats'}
          iconVariant='chats'
          text='Chats'
          variant={variantSize}
          selected={getSelected('/chats')}
        />
        <NavButton
          to={'/calendar'}
          iconVariant='date'
          text='Calendar'
          variant={variantSize}
          selected={getSelected('/calendar')}
        />
      </div>

      <div className='settings flex flex-col gap-4'>
        <NavButton
          to={'/settings'}
          iconVariant='settings'
          text='Settings'
          variant={variantSize}
          selected={getSelected('/settings')}
        />
        <NavButton
          to={'/profile'}
          iconVariant='account'
          text='Profile'
          variant={variantSize}
          selected={getSelected('/profile')}
        />
        <NavButton
          to={'/logout'}
          iconVariant='logout'
          text='Logout'
          variant={variantSize}
          selected={getSelected('/logout')}
        />
      </div>
    </nav>
  );
};

export default Sidemenu;
