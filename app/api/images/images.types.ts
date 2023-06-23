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
   * Mime type of the image
   */
  type: string;
}
