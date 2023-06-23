import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME ?? '';

export const GET = async () => {
  const client = await clientPromise;
  const cursor = client.db(DB_NAME).collection('images').find();
  const images = await cursor.toArray();
  console.log(images);
  return NextResponse.json(images);
};

export const PUT = async (req: NextRequest) => {
  const { key, name, size, type } = await req.json();
  const client = await clientPromise;
  const image = { key, name, size, type };
  await client.db(DB_NAME).collection('images').insertOne(image);
  return NextResponse.json(image);
};
