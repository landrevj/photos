import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/** external components */
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import NextImage from 'next/image';

/** components */
import ImageMetadata from './ImageMetadata/ImageMetadata';
import Navigation from './Navigation/Navigation';

/** state */

/** helpers */
import { replace } from '@/lib/history/replace';

/** types */
import type { Image } from '@/types/images';

interface ImageGalleryProps {
  /**
   * The id of the current image being displayed
   */
  value: string;
  /**
   * The images the user can cycle through
   */
  images: Image[];
}

export const ImageGallery = ({ value, images = [] }: ImageGalleryProps) => {
  const searchParams = useSearchParams();
  const [position, setPosition] = useState(() =>
    images.findIndex((img) => img._id === value)
  );
  const image = images[position];
  const bgColor = image.colors.dominant || '#000';

  const scaleUp = true;

  const [imageClientWidth, setImageClientWidth] = useState<number>(0);
  const [imageClientHeight, setImageClientHeight] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const container = useRef<HTMLDivElement | null>(null);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageClientWidth === 0 ||
      imageClientHeight === 0
    ) {
      return 0;
    }

    const scale = Math.min(
      containerWidth / imageClientWidth,
      containerHeight / imageClientHeight
    );
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageClientWidth,
    imageClientHeight,
  ]);

  const handleResize = useCallback(() => {
    if (container.current !== null) {
      const rect = container.current.getBoundingClientRect();
      setContainerWidth(rect.width);
      setContainerHeight(rect.height);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, [container]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div
      className='h-screen w-full bg-neutral-950 transition-colors'
      style={{ backgroundColor: bgColor }}
    >
      <div className='h-screen w-full overflow-y-auto bg-gradient-to-tr from-[#000000aa] to-[#00000066]'>
        <div className='flex h-full w-full overflow-hidden'>
          <TransformWrapper
            key={imageScale}
            initialScale={imageScale}
            minScale={imageScale}
            centerOnInit
          >
            {(utils) => (
              <section className='relative flex h-full flex-1 justify-center'>
                <div className='absolute top-0 h-full w-full' ref={container}>
                  <TransformComponent wrapperClass='!w-full !h-full  !overflow-visible'>
                    <NextImage
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${image.awsFilename}`}
                      alt='image'
                      width={image.width}
                      height={image.height}
                      unoptimized
                      onLoadingComplete={(img) => {
                        setImageClientWidth(img.clientWidth);
                        setImageClientHeight(img.clientHeight);
                        utils.resetTransform();
                      }}
                    />
                    {/* </div> */}
                  </TransformComponent>
                </div>
                <Navigation
                  position={position}
                  images={images}
                  zoomUtils={utils}
                  onNavForward={() => {
                    setPosition((prev) => prev - 1);
                    replace(
                      `/image/${images[position - 1]._id}?${searchParams}`
                    );
                    utils.resetTransform();
                  }}
                  onNavBackward={() => {
                    setPosition((prev) => prev + 1);
                    replace(
                      `/image/${images[position + 1]._id}?${searchParams}`
                    );
                    utils.resetTransform();
                  }}
                />
              </section>
            )}
          </TransformWrapper>
          <section
            className='z-10 my-6 mr-8 w-72 flex-none rounded-xl py-1 drop-shadow-md transition-colors'
            style={{ backgroundColor: `${bgColor}ee` }}
          >
            {image && <ImageMetadata image={image} />}
          </section>
        </div>
        <div className='bg-black bg-opacity-40'>
          <div className='container mx-auto h-[399px]'>more stuff</div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
