import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const DB_NAME = process.env.MONGODB_DB_NAME ?? '';

export const GET = async () => {
  const client = await clientPromise;
  const cursor = client
    .db(DB_NAME)
    .collection('images')
    .aggregate([{ $sample: { size: 1 } }]);
  const images = await cursor.toArray();
  return NextResponse.json(images[0] || null, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=1',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=1',
    },
  });
};
