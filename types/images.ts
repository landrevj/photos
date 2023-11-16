export interface Image {
  /**
   * Mongodb id
   */
  _id: string;
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
  histogram: {
    /**
     * Max y value for all the data. Useful for determining graph domain.
     */
    yMax: number;
    /**
     * Object containing entries for per-channel histogram data.
     */
    channels: {
      red: { max: number; data: number[] };
      green: { max: number; data: number[] };
      blue: { max: number; data: number[] };
      rgOverlap: { max: number; data: number[] };
      gbOverlap: { max: number; data: number[] };
      rbOverlap: { max: number; data: number[] };
      rgbOverlap: { max: number; data: number[] };
    };
  };
  /**
   * Image exif data
   */
  exif: Record<any, any>;
  /**
   * Image exif data
   */
  gps: { latitude?: number; longitude?: number };
  /**
   * Contains color information about the image.
   */
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
   * If true the image will show up as one of the random images on the home page
   */
  isAllowedOnHomepage?: boolean;
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

export interface ImageQueryParams {
  groupBy: 'day' | 'month' | 'year';
  order: 'asc' | 'desc';
  [key: string]: string;
}

export type ImageQueryGroup = {
  _id: string;
  images: Image[];
};
