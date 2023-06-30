/* eslint-disable max-classes-per-file */

import 'image-js';

declare class ColorThief {
  constructor(): {};
  getColor(img: HTMLImageElement): number[];
}

declare module 'colorthief' {
  export = ColorThief;
}
