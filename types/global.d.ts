/* eslint-disable max-classes-per-file */
type Exifr = import('exifr').parse;

declare module 'colorthief' {
  class ColorThief {
    constructor(): {};
    getColor(img: HTMLImageElement): number[];
  }
  export default ColorThief;
}

declare module 'exifr/dist/lite.esm.mjs' {
  export function parse(
    data: Input,
    options?: Options | Filter | boolean
  ): Promise<any>;
  export function gps(data: Input): Promise<GpsOutput>;
}
