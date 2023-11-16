import clientPromise, { ObjectId } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

const DB_NAME = process.env.MONGODB_DB_NAME ?? '';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;

  const doc = await client
    .db(DB_NAME)
    .collection('images')
    .findOne({
      _id: new ObjectId(params.id),
    });

  return NextResponse.json(doc);
};
