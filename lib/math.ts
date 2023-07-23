export const bytesToMB = (bytes: number) => bytes / (1024 * 1024);

export const percentDifference = (A: number, B: number) =>
  100 * Math.abs((A - B) / ((A + B) / 2));
