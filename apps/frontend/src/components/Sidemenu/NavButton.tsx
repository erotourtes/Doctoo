import type { Path } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';
import { cn } from '../../utils/cn';

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
      className={cn(
        variant !== 'small' ? 'flex w-full rounded-xl p-4' : 'inline-flex rounded-lg p-3',
        'group items-center justify-start gap-2 no-underline transition-all',
        selected && 'text-dark bg-white',
        !selected && 'text-white hover:bg-main-dark',
      )}
    >
      <Icon
        variant={iconVariant}
        className={cn('size-6 transition-all', selected ? 'text-main' : 'group-hover:text-white')}
      />
      {variant !== 'small' && (
        <span className={cn('font-medium', !selected && 'group-hover:text-white', selected && 'text-black')}>
          {text}
        </span>
      )}
      <div className='absolute'>
        <div className='relative -top-5 left-10'>
          {variant === 'small' && (
            <span className='z-100 invisible absolute left-full  ml-1 whitespace-nowrap rounded-xl bg-main-dark p-2 text-white transition-all group-hover:visible'>
              {text}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NavButton;
