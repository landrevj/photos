import { twMerge } from 'tailwind-merge';

/** external components */
import { MdLock } from '@/lib/icons';

/** components */
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Switch from '@/components/common/Switch/Switch';

/** state */

/** helpers */

/** types */
interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div className={twMerge(className, 'bg-neutral-300')}>
      <div className='flex h-full w-full flex-col flex-wrap gap-4 bg-gradient-to-tr from-[#000000aa] to-[#00000066] p-8'>
        <div className='flex max-w-full justify-between gap-4 overflow-hidden'>
          <div className='flex shrink items-center gap-3 overflow-hidden text-2xl'>
            <span className='h-8 w-40 animate-pulse rounded-xl bg-neutral-300' />
          </div>
        </div>
        <div className='flex flex-1 flex-wrap gap-8'>
          <div className='flex flex-1 flex-col gap-8'>
            <Card className='flex h-14 animate-pulse justify-between gap-2 bg-neutral-300' />
            <div className='flex flex-col gap-2'>
              <Switch label='Allow on homepage' />
              <div className='h-52 animate-pulse rounded-xl bg-neutral-300' />
            </div>
            <div className='flex flex-col gap-2'>
              <h4>Colors</h4>
              <div className='flex flex-1 gap-2'>
                <div className='h-14 flex-1 animate-pulse rounded-xl bg-neutral-300 p-4 text-center drop-shadow' />
                <Button
                  className='rounded-xl text-2xl'
                  color='transparent'
                  icon={<MdLock />}
                  disabled
                />
                <div className='h-14 flex-1 animate-pulse rounded-xl bg-neutral-300 p-4 text-center drop-shadow' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h4>Histogram</h4>
              <div className='h-32 animate-pulse rounded-xl bg-neutral-300' />
            </div>
            <div className='flex flex-col gap-2'>
              <h4>GPS</h4>
              <div className='h-72 animate-pulse rounded-xl bg-neutral-300' />
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-4'>
            <div>
              <h4>EXIF</h4>
              <hr className='border-white border-opacity-50 pb-2' />
              {Array(15)
                .fill(1)
                .map((_, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className=' h-[47px] odd:bg-neutral-600 odd:bg-opacity-5 even:bg-neutral-900 even:bg-opacity-5'
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
