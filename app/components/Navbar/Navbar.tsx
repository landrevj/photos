/** external components */
import { MdLogin } from '@/lib/icons';

/** components */
import { Button } from '@/components/common/Button/Button';

/** state */

/** helpers */

/** types */

export const Navbar = () => {
  return (
    <nav className='flex h-[12.5vh] items-center'>
      <Button className='bg-transparent' href='/gallery'>
        gallery
      </Button>
      <Button className='bg-transparent' href=''>
        blog
      </Button>
      <Button className='bg-transparent' href=''>
        about
      </Button>
      <div className='flex-1' />
      <Button className='bg-transparent' href='' icon={<MdLogin />}>
        login
      </Button>
    </nav>
  );
};

export default Navbar;
