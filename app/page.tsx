/** external components */

/** components */
import Home from '@/components/Home/Home';
import Navbar from '@/components/Navbar/Navbar';

/** state */

/** helpers */

export const HomePage = () => {
  return (
    <main className='container mx-auto px-8'>
      <Navbar activeRoute='/' />
      <Home />
    </main>
  );
};

export default HomePage;
