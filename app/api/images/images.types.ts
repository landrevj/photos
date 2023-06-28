import { ObjectId } from 'mongodb';

export interface Image {
  /**
   * Mongodb id
   */
  _id: ObjectId;
  /**
   * The aws file key for the image
   */
  awsFilename: string;
  /**
   * The file's name
   */
  name: string;
  /**
   * Size in bits
   */
  size: number;
  /**
   * Pixel width of image
   */
  width: number;
  /**
   * Pixel height of image
   */
  height: number;
  /**
   * RGB Histogram data
   */
  histogram: number[][];
  /**
   * Image tag data
   */
  meta: {
    /**
     * Image exif data
     */
    exif?: Record<any, any>;
    /**
     * Image tiff data
     */
    tiff?: Record<any, any>;
  };
  colors: {
    /**
     * Hex string for the image's dominant color
     */
    dominant: string;
    /**
     * Hex string for the image's dominant color's complement
     */
    complement: string;
  };
  /**
   * Datetime the photo was taken (exif DateTimeOriginal) or the createdAt date if unspecified
   */
  takenAt: Date;
  /**
   * DB document creation date
   */
  createdAt: Date;
  /**
   * DB document last modified date
   */
  updatedAt: Date;
}
