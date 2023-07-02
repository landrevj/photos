/* eslint-disable max-classes-per-file */

declare class ColorThief {
  constructor(): {};
  getColor(img: HTMLImageElement): number[];
}

declare module 'colorthief' {
  export = ColorThief;
}
