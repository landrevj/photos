import ColorThief from 'colorthief';
import ImageJs from 'image-js';
import tinycolor from 'tinycolor2';

export const getImageColors = async (image: ImageJs) => {
  const colorThief = new ColorThief();
  const newImg = new Image();
  newImg.src = image.toDataURL();
  await newImg.decode();
  const color = colorThief.getColor(newImg);
  return {
    dominant: tinycolor(`rgb ${color.join(' ')}`).toHexString(),
    complement: tinycolor(`rgb ${color.join(' ')}`)
      .complement()
      .toHexString(),
  };
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
