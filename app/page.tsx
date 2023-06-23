'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Uploader } from '@/lib/aws/s3/uploader';
import { useGetAllImagesQuery } from '@/lib/redux/state/api';

export const Home = () => {
  const { data, isSuccess } = useGetAllImagesQuery();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [pgvalue, setPgvalue] = useState<number | undefined>(undefined);
  const [perf, setPerf] = useState<string | number | undefined>(undefined);
  // const [ta, setTa] = useState(undefined);

  useEffect(() => {
    if (file) {
      let percentage: number;

      setPgvalue(0);
      setPerf('-');
      const uploader = new Uploader({
        file,
        chunkSize: Number(process.env.NEXT_PUBLIC_UPLOAD_PART_SIZE ?? 5),
        threadsQuantity: Number(process.env.NEXT_PUBLIC_UPLOAD_THREADS ?? 1),
        useTransferAcceleration: false,
        useUUIDForKey: true,
      });
      const tBegin = performance.now();
      uploader
        .onProgress(({ percentage: newPercentage }: { percentage: number }) => {
          // to avoid the same percentage to be logged twice
          if (percentage === 100) {
            setPerf((performance.now() - tBegin) / 1000);
          }
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            setPgvalue(percentage);
          }
        })
        .onError((error) => {
          setFile(undefined);
          console.error(error);
        });

      uploader.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div>
      <div
        style={{ backgroundColor: '#e2e2e2', padding: '20px', margin: '10px' }}
      >
        <strong style={{ display: 'block' }}>Step 5 - Choose a file</strong>
        <br />
        <input
          type='file'
          id='fileinput'
          onChange={(e) => {
            setFile(e.target?.files?.[0]);
          }}
        />
      </div>
      <div
        style={{ backgroundColor: '#e2e2e2', padding: '20px', margin: '10px' }}
      >
        <strong style={{ display: 'block' }}>Step 6 - Monitor</strong>
        <br />
        <span id='output'>
          {pgvalue}% ({perf} sec)
        </span>
      </div>
      <div>
        {isSuccess &&
          data.map((image) => (
            <Image
              key={image.key}
              src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${image.key}`}
              alt='image'
              width={300}
              height={100}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
