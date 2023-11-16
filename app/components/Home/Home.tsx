/** external components */
import { MdArrowDownward } from '@/lib/icons';

/** components */
import { Button } from '@/components/common/Button/Button';
import FoldIndicator from './FoldIndicator/FoldIndicator';
import Hero from './Hero/Hero';

/** state */

/** helpers */

/** types */

export const Home = () => {
  return (
    <>
      <div className='relative h-[75vh] overflow-hidden rounded-xl drop-shadow-lg'>
        <Hero>
          <span className='text-9xl font-extrabold text-white mix-blend-difference'>
            landrevj.photos
          </span>
        </Hero>
      </div>
      <FoldIndicator />
      <div className='h-[500px]'>
        other home page stuff goes <MdArrowDownward /> here
        <Button href='/gallery'>gallery</Button>
        <Button>gallery</Button>
        <span>asdf</span>
      </div>
    </>
  );
};

export default Home;
