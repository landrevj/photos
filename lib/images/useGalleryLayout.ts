import { Image } from '@/app/api/images/images.types';
import { useMemo } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';

const getStartingValues = (): {
  width: number;
  maxRatioWidth: number;
  imageStyles: { width: string; paddingBottom: string }[];
  lastRowWidthRemainder: string;
}[] => [
  {
    width: 640,
    maxRatioWidth: 1.16,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
  {
    width: 768,
    maxRatioWidth: 2.32,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
  {
    width: 1024,
    maxRatioWidth: 3.48,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
  {
    width: 1280,
    maxRatioWidth: 4.64,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
  {
    width: 1536,
    maxRatioWidth: 5.8,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
  {
    width: Number.MAX_SAFE_INTEGER,
    maxRatioWidth: 6.98,
    imageStyles: [],
    lastRowWidthRemainder: '0%',
  },
];

// @see https://github.com/fmkra/next-gallery/blob/development/src/Gallery.tsx
export const useGalleryLayout = (
  images: Image[],
  spanLastRowThreshold = 100
) => {
  const breakpoints = useMemo(() => {
    return getStartingValues().map((breakpoint) => {
      let currentRatio = 0;
      const imageStyles: { width: string; paddingBottom: string }[] = [];
      for (let i = 0; i < images.length; i += 1) {
        const iImageAspectRatio = images[i].width / images[i].height;
        if (currentRatio + iImageAspectRatio <= breakpoint.maxRatioWidth) {
          currentRatio += iImageAspectRatio;
        } else {
          for (let j = imageStyles.length; j < i; j += 1) {
            const jImageAspectRatio = images[j].width / images[j].height;
            const width =
              Math.floor((jImageAspectRatio / currentRatio) * 1000) / 10;
            imageStyles.push({
              width: `${width}%`,
              paddingBottom: `${width / jImageAspectRatio}%`,
            });
          }
          currentRatio = iImageAspectRatio;
        }
      }

      const widthRemainder =
        Math.floor((1 - currentRatio / breakpoint.maxRatioWidth) * 1000) / 10;
      const shouldSpanLastRow = 100 - widthRemainder < spanLastRowThreshold;
      for (let i = imageStyles.length; i < images.length; i += 1) {
        const width =
          Math.floor(
            (images[i].width /
              images[i].height /
              (shouldSpanLastRow ? breakpoint.maxRatioWidth : currentRatio)) *
              1000
          ) / 10;
        imageStyles.push({
          width: `${width}%`,
          paddingBottom: `${width / (images[i].width / images[i].height)}%`,
        });
      }

      return {
        ...breakpoint,
        imageStyles,
        lastRowWidthRemainder: shouldSpanLastRow ? `${widthRemainder}%` : '0%',
      };
    });
  }, [images, spanLastRowThreshold]);

  const windowWidth = useWindowWidth();

  const currentBreakpoint = useMemo(() => {
    if (windowWidth === null) {
      return { imageStyles: null, lastRowWidthRemainder: null };
    }

    return (
      breakpoints.find((breakpoint) => breakpoint.width > windowWidth) ||
      breakpoints[breakpoints.length - 1]
    );
  }, [breakpoints, windowWidth]);

  return currentBreakpoint;
};
