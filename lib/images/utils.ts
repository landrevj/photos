// eslint-disable-next-line import/extensions
import { gps, parse } from 'exifr/dist/lite.esm.mjs';
import ColorThief from 'colorthief';
import tinycolor from 'tinycolor2';

export const getImageColors = async (image: HTMLImageElement) => {
  const colorThief = new ColorThief();
  const color = colorThief.getColor(image);
  return {
    dominant: tinycolor(`rgb ${color.join(' ')}`).toHexString(),
    complement: tinycolor(`rgb ${color.join(' ')}`)
      .complement()
      .toHexString(),
  };
};
export const getImageFileData = async (file: File) => {
  const img = new Image();
  const obj = URL.createObjectURL(file);
  img.src = obj;
  await img.decode();

  const data = {
    name: file.name,
    size: file.size,
    width: img.width,
    height: img.height,
    exif: await parse(img),
    gps: await gps(img),
    colors: await getImageColors(img),
  };
  URL.revokeObjectURL(obj);
  return data;
};

export const createImageColorDataUrl = (
  color: string,
  width: number = 1,
  height: number = 1
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  return canvas.toDataURL();
};
