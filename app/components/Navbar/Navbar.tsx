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
    <nav className='flex h-[12.5vh] items-center'>
      <Button
        color={activeRoute === '/' ? 'secondary' : 'transparent'}
        href='/'
      >
        /
      </Button>
      <Button
        color={activeRoute === '/gallery' ? 'secondary' : 'transparent'}
        href='/gallery'
      >
        gallery
      </Button>
      <Button
        color={activeRoute === '/blog' ? 'secondary' : 'transparent'}
        href=''
      >
        blog
      </Button>
      <Button
        color={activeRoute === '/about' ? 'secondary' : 'transparent'}
        href=''
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
