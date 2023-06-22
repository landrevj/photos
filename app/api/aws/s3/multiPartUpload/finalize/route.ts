import { CompleteMultipartUploadCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

type UrlWithDetails = {
  PartNumber: number;
  price: number;
};

const s3 = new S3Client({});

export const POST = async (req: NextRequest) => {
  const { fileKey, fileId, parts } = await req.json();

  const sortedProducts = parts.sort((p1: UrlWithDetails, p2: UrlWithDetails) =>
    // eslint-disable-next-line no-nested-ternary
    p1.PartNumber < p2.PartNumber ? -1 : p1.price > p2.price ? 1 : 0
  );

  const command = new CompleteMultipartUploadCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    UploadId: fileId,
    MultipartUpload: {
      // ordering the parts to make sure they are in the right order
      Parts: sortedProducts,
    },
  });
  await s3.send(command);

  return new NextResponse('ok', { status: 200 });
};
