import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState<null | number>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
