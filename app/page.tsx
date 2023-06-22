'use client';

import { useEffect, useState } from 'react';
import { Uploader } from '@/lib/aws/s3/uploader';

export const Home = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [pgvalue, setPgvalue] = useState<number | undefined>(undefined);
  const [perf, setPerf] = useState<string | number | undefined>(undefined);
  // const [ta, setTa] = useState(undefined);

  useEffect(() => {
    if (file) {
      const uploaderOptions = {
        file,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
        chunkSize: Number(process.env.NEXT_PUBLIC_UPLOAD_PART_SIZE ?? 5),
        threadsQuantity: Number(process.env.NEXT_PUBLIC_UPLOAD_THREADS ?? 1),
        useTransferAcceleration: false,
      };

      let percentage: number;

      setPgvalue(0);
      setPerf('-');
      const uploader = new Uploader(uploaderOptions);
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
    </div>
  );
};

export default Home;
