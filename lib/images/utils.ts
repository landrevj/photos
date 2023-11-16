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

export const getPixelDataFromImg = (img: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  if (!ctx) throw Error('unable to get canvas 2d context');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height).data;
};

const getOverlapHistogram = (...hists: number[][]) => {
  const histogram = Array(256).fill(0);
  let max = 0;
  for (let i = 0; i < 256; i += 1) {
    histogram[i] = Math.min(...hists.map((hist) => hist[i]));
    if (histogram[i] > max) max = histogram[i];
  }

  return { max, histogram };
};

export const getImageHistogram = (img: HTMLImageElement) => {
  const buffer = getPixelDataFromImg(img);
  const rHist: number[] = Array(256).fill(0);
  const gHist: number[] = Array(256).fill(0);
  const bHist: number[] = Array(256).fill(0);
  let rMax = 0;
  let gMax = 0;
  let bMax = 0;
  for (let i = 0; i < buffer.length; i += 4) {
    const pixelR = buffer[i];
    const pixelG = buffer[i + 1];
    const pixelB = buffer[i + 2];
    rHist[pixelR] += 1;
    gHist[pixelG] += 1;
    bHist[pixelB] += 1;

    if (rHist[pixelR] > rMax) rMax = rHist[pixelR];
    if (gHist[pixelG] > gMax) gMax = gHist[pixelG];
    if (bHist[pixelB] > bMax) bMax = bHist[pixelB];
  }
  const { max: rgOverlapMax, histogram: rgOverlapHist } = getOverlapHistogram(
    rHist,
    gHist
  );
  const { max: gbOverlapMax, histogram: gbOverlapHist } = getOverlapHistogram(
    gHist,
    bHist
  );
  const { max: rbOverlapMax, histogram: rbOverlapHist } = getOverlapHistogram(
    rHist,
    bHist
  );
  const { max: rgbOverlapMax, histogram: rgbOverlapHist } = getOverlapHistogram(
    rHist,
    gHist,
    bHist
  );

  let yMax = 0;
  for (let i = 0; i < 256; i += 1) {
    if (yMax < rHist[i]) {
      yMax = rHist[i];
    } else if (yMax < gHist[i]) {
      yMax = gHist[i];
    } else if (yMax < bHist[i]) {
      yMax = bHist[i];
    }
  }

  return {
    yMax,
    channels: {
      red: { max: rMax, data: rHist },
      green: { max: gMax, data: gHist },
      blue: { max: bMax, data: bHist },
      rgOverlap: { max: rgOverlapMax, data: rgOverlapHist },
      gbOverlap: { max: gbOverlapMax, data: gbOverlapHist },
      rbOverlap: { max: rbOverlapMax, data: rbOverlapHist },
      rgbOverlap: { max: rgbOverlapMax, data: rgbOverlapHist },
    },
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
    histogram: getImageHistogram(img),
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
