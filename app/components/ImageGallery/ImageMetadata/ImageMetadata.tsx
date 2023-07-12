/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface ImageMetadataProps {
  image: Image;
}

export const ImageMetadata = ({ image }: ImageMetadataProps) => {
  return (
    <>
      <h1>{image.name}</h1>
      <p>
        {new Date(image.takenAt).toLocaleDateString([], {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })}
      </p>
      <p>
        {image.width}x{image.height}
      </p>
    </>
  );
};

export default ImageMetadata;
