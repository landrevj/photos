import clsx from 'clsx';
import tinycolor from 'tinycolor2';

/** external components */
import { ParentSize } from '@visx/responsive';

/** components */
import Histogram from '../../common/Histogram/Histogram';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface ImageMetadataProps {
  image: Image;
}

export const ImageMetadata = ({ image }: ImageMetadataProps) => {
  const isLight = tinycolor(image.colors.dominant).isLight();
  return (
    <div
      className={clsx(
        'm-4 flex flex-col gap-4',
        isLight ? 'text-neutral-950' : 'text-neutral-100'
      )}
    >
      <h1 className='font-semibold'>{image.name}</h1>
      <div
        className={clsx(
          'flex flex-col gap-1 italic',
          isLight ? 'text-neutral-800' : 'text-neutral-300'
        )}
      >
        <div className='flex text-sm'>
          <span>
            {new Date(image.takenAt).toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <div className='flex-1' />
          <span>
            {image.width}x{image.height}
          </span>
        </div>
        <div className='-mx-4 overflow-clip bg-black bg-opacity-30'>
          <ParentSize>
            {({ width }) => (
              <Histogram data={image.histogram} width={width} height={125} />
            )}
          </ParentSize>
        </div>
        <div className='flex justify-between text-sm'>
          <span>ISO {image.exif.ISO}</span>
          <span>{image.exif.FocalLength}mm</span>
          <span>f / {image.exif.FNumber}</span>
          <span>
            1/{Number(2 ** image.exif.ShutterSpeedValue).toFixed(0)} sec
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageMetadata;
