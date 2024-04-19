import { Link, Path } from "react-router-dom";
import Icon from "@UI/Icon/Icon";
import { IconVariant } from "@UI/Icon/types";

type NavButtonProps = {
  to: string | Partial<Path>;
  iconVariant: IconVariant;
  text: string;
  variant?: 'small' | 'large';
  selected?: boolean;
}

const NavButton: React.FunctionComponent<NavButtonProps> = ({ to, iconVariant, text, variant = 'large', selected = false }) => {
  return (
    <Link to={to} className={`${variant !== 'small' ? 'w-full flex p-4 rounded-xl' : 'inline-flex p-3 rounded-lg'} relative group gap-2 items-center justify-start ${!selected ? 'text-white' : 'bg-white'} hover:bg-main-dark active:text-white active:bg-white transition-all no-underline`}>
      <Icon variant={iconVariant} className={`size-6 group-hover:text-white group-active:text-main ${selected ? 'text-main' : ''} transition-all`} />
      {variant !== 'small' && <span className='font-medium group-hover:text-white group-active:text-black'>{text}</span>}
      {variant === 'small' && <span className='invisible group-hover:visible whitespace-nowrap text-white absolute t-1/2 left-full z-10 ml-1 p-2 bg-main-dark rounded-xl tooltip transition-all'>{text}</span>}
    </Link>
  )
}

export default NavButton