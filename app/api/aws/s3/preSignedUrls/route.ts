import { NextRequest, NextResponse } from 'next/server';
import { S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({});

export const POST = async (req: NextRequest) => {
  const { fileKey, fileId, parts } = await req.json();

  const multipartParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    UploadId: fileId,
  };

  const promises = [];

  for (let index = 0; index < parts; index += 1) {
    const command = new UploadPartCommand({
      ...multipartParams,
      PartNumber: index + 1,
    });
    promises.push(
      getSignedUrl(s3, command, {
        expiresIn: parseInt(process.env.S3_URL_EXPIRATION || '', 10),
      })
    );
  }

  const signedUrls = await Promise.all(promises);
  const urlsWithPartNumber = signedUrls.map((signedUrl, index) => ({
    signedUrl,
    PartNumber: index + 1,
  }));

  return NextResponse.json({ parts: urlsWithPartNumber });
};
