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

  const container = useRef<HTMLDivElement | null>(null);

  // prevent panning when zoomed all the way out (mobile needs to be able to scroll)
  const [isInitialState, setIsInitialState] = useState(true);
  const [lastTouch, setLastTouch] = useState<number | null>(null);
  const onWheel = useCallback(
    (event: WheelEvent) => {
      if (!isInitialState) {
        return;
      }
      if (event.deltaY > 0) {
        event.stopPropagation();
      } else if (event.deltaY < 0) {
        setIsInitialState(false);
      }
    },
    [isInitialState]
  );
  const onDoubleClick = useCallback(() => {
    if (isInitialState) {
      setIsInitialState(false);
    }
  }, [isInitialState]);
  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      const isDoubleTap = lastTouch && new Date().getTime() - lastTouch < 200;
      if (isDoubleTap && event.touches.length === 1) {
        onDoubleClick();
      } else {
        setLastTouch(new Date().getTime());
      }
    },
    [lastTouch, onDoubleClick]
  );

  useEffect(() => {
    const ref = container.current;
    if (ref) {
      ref.addEventListener('wheel', onWheel, { capture: true });
      ref.addEventListener('dblClick', onDoubleClick, {
        capture: true,
      });
      ref.addEventListener('touchstart', onTouchStart, {
        capture: true,
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener('wheel', onWheel, {
          capture: true,
        });
        ref.removeEventListener('dblClick', onDoubleClick, {
          capture: true,
        });
        ref.removeEventListener('touchstart', onTouchStart, {
          capture: true,
        });
      }
    };
  }, [onDoubleClick, onTouchStart, onWheel]);

  // keep image contained to parent when zoomed out
  const [imageClientWidth, setImageClientWidth] = useState<number>(0);
  const [imageClientHeight, setImageClientHeight] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageClientWidth === 0 ||
      imageClientHeight === 0
    ) {
      return 0;
    }

    return Math.min(
      containerWidth / imageClientWidth,
      containerHeight / imageClientHeight
    );
  }, [containerWidth, containerHeight, imageClientWidth, imageClientHeight]);

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
            panning={{ disabled: isInitialState }}
            onZoom={(ref) => setIsInitialState(ref.state.scale === 1)}
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
                        setIsInitialState(true);
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
                    setIsInitialState(true);
                  }}
                  onNavBackward={() => {
                    setPosition((prev) => prev + 1);
                    replace(
                      `/image/${images[position + 1]._id}?${searchParams}`
                    );
                    utils.resetTransform();
                    setIsInitialState(true);
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
