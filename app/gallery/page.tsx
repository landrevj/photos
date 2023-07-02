/** external components */

/** components */
// import Gallery from '@/components/Gallery/Gallery';
import Navbar from '@/components/Navbar/Navbar';

/** state */

/** helpers */

/** types */

export const GalleryPage = () => {
  return (
    <main className='container mx-auto px-8'>
      <Navbar activeRoute='/gallery' />
      {/* <Gallery /> */}
    </main>
  );
};

export default GalleryPage;
