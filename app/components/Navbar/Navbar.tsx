/** external components */
import { MdLogin } from '@/lib/icons';

/** components */
import { Button } from '@/components/common/Button/Button';

/** state */

/** helpers */

/** types */
interface NavbarProps {
  activeRoute?: string;
}

export const Navbar = ({ activeRoute }: NavbarProps) => {
  return (
    <nav className='flex h-40 items-center'>
      <Button
        color='transparent'
        href='/'
        className={activeRoute === '/' ? 'text-blue-500' : ''}
      >
        /
      </Button>
      <Button
        color='transparent'
        href='/gallery'
        className={activeRoute === '/gallery' ? 'text-blue-500' : ''}
      >
        gallery
      </Button>
      <Button
        color='transparent'
        href=''
        className={activeRoute === '/blog' ? 'text-blue-500' : ''}
      >
        blog
      </Button>
      <Button
        color='transparent'
        href=''
        className={activeRoute === '/about' ? 'text-blue-500' : ''}
      >
        about
      </Button>
      <div className='flex-1' />
      <Button color='transparent' href='' icon={<MdLogin />}>
        login
      </Button>
    </nav>
  );
};

export default Navbar;
