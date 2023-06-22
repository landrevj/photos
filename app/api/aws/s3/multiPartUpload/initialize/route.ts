import { CreateMultipartUploadCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new S3Client({});

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  const command = new CreateMultipartUploadCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
  });
  const upload = await s3.send(command);

  return NextResponse.json({
    fileId: upload.UploadId,
    fileKey: upload.Key,
  });
};
