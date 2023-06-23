export interface Image {
  /**
   * Mongodb id
   */
  _id: string;
  /**
   * The s3 file key for the image
   */
  key: string;
  /**
   * The file's name
   */
  name: string;
  /**
   * Size in bits
   */
  size: number;
  /**
   * Mime type of the image
   */
  type: string;
}
