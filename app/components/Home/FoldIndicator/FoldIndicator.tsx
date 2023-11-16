'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

/** external components */
import { MdArrowDownward } from '@/lib/icons';

/** components */

/** state */

/** helpers */
import { debounce } from '@/lib/debounce';

/** types */

export const FoldIndicator = () => {
  const [isAtTopOfPage, setIsAtTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsAtTopOfPage(window.scrollY === 0);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex h-40 w-full items-center justify-center'>
      <MdArrowDownward
        className={clsx(
          'text-2xl transition-colors',
          !isAtTopOfPage && 'text-transparent'
        )}
      />
    </div>
  );
};

export default FoldIndicator;
