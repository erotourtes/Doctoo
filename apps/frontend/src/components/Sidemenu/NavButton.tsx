import type { Path } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';

type NavButtonProps = {
  to: string | Partial<Path>;
  iconVariant: IconVariant;
  text: string;
  variant?: 'small' | 'large';
  selected?: boolean;
};

const NavButton: React.FunctionComponent<NavButtonProps> = ({
  to,
  iconVariant,
  text,
  variant = 'large',
  selected = false,
}) => {
  return (
    <Link
      to={to}
      className={`${variant !== 'small' ? 'flex w-full rounded-xl p-4' : 'inline-flex rounded-lg p-3'} group relative items-center justify-start gap-2 ${!selected ? 'text-white' : 'bg-white'} no-underline transition-all hover:bg-main-dark active:bg-white active:text-white`}
    >
      <Icon
        variant={iconVariant}
        className={`size-6 group-hover:text-white group-active:text-main ${selected ? 'text-main' : ''} transition-all`}
      />
      {variant !== 'small' && (
        <span className='font-medium group-hover:text-white group-active:text-black'>{text}</span>
      )}
      {variant === 'small' && (
        <span className='t-1/2 invisible absolute left-full z-10 ml-1 whitespace-nowrap rounded-xl bg-main-dark p-2 text-white transition-all group-hover:visible'>
          {text}
        </span>
      )}
    </Link>
  );
};

export default NavButton;
