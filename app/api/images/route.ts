import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Image } from './images.types';

const DB_NAME = process.env.MONGODB_DB_NAME ?? '';

export const parseExifDateTimeOriginal = (str?: string) => {
  if (!str) {
    return undefined;
  }
  const parts = str.split(' ');
  return new Date(`${parts[0].replaceAll(':', '-')} ${parts[1]}`);
};

export const GET = async () => {
  const client = await clientPromise;
  const cursor = client.db(DB_NAME).collection('images').find();
  const images = await cursor.toArray();
  return NextResponse.json(images);
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  const client = await clientPromise;
  const image: Partial<Image> = {
    awsFilename: data.awsFilename,
    name: data.name,
    width: data.width,
    height: data.height,
    size: data.size,
    histogram: data.histogram,
    meta: {
      exif: data.meta?.exif,
      tiff: data.meta?.tiff,
    },
    colors: data.colors,
    takenAt: new Date(
      parseExifDateTimeOriginal(data.meta?.exif?.DateTimeOriginal) ?? Date.now()
    ),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await client.db(DB_NAME).collection('images').insertOne(image);
  return NextResponse.json(image);
};
