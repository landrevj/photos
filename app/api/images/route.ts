import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { Image } from '@/types/images';

const DB_NAME = process.env.MONGODB_DB_NAME ?? '';

export const parseExifDateTimeOriginal = (str?: string) => {
  if (!str) {
    return undefined;
  }
  const parts = str.split(' ');
  return new Date(`${parts[0].replaceAll(':', '-')} ${parts[1]}`);
};

export const GET = async (req: NextRequest) => {
  const client = await clientPromise;

  const groupBy = req.nextUrl.searchParams.get('groupBy') || 'none';
  const order = req.nextUrl.searchParams.get('order') || 'desc';

  const groupByMap: Record<string, string> = {
    day: '%Y-%m-%d',
    month: '%Y-%m',
    year: '%Y',
    none: '',
  };
  const orderMap: Record<string, number> = {
    desc: -1,
    asc: 1,
  };

  const cursor = client
    .db(DB_NAME)
    .collection('images')
    .aggregate([
      {
        $sort: {
          takenAt: orderMap[order],
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: groupByMap[groupBy] ?? '',
              date: '$takenAt',
            },
          },
          images: { $push: '$$ROOT' },
        },
      },
      {
        $sort: {
          _id: orderMap[order],
        },
      },
    ]);
  const imageGroups = await cursor.toArray();
  return NextResponse.json(imageGroups);
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
