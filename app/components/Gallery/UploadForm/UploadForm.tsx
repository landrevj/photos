'use client';

import { useEffect, useState } from 'react';

/** external components */

/** components */

/** state */

/** helpers */
import { getImageFileData } from '@/lib/images/utils';
import { Uploader } from '@/lib/aws/s3/uploader';

/** types */
interface UploadFormProps {
  onSuccess: () => void;
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pgvalue, setPgvalue] = useState<number | undefined>(undefined);
  const [perf, setPerf] = useState<string | number | undefined>(undefined);

  useEffect(() => {
    if (selectedFile) {
      let percentage: number;

      setPgvalue(0);
      setPerf('-');

      const uploader = new Uploader({
        file: selectedFile,
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
        .onSuccess(async ({ awsFilename, file }) => {
          await fetch('/api/images', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              awsFilename,
              ...(await getImageFileData(file)),
            }),
          });
          onSuccess();
        })
        .onError((error) => {
          setSelectedFile(undefined);
          console.error(error);
        });

      uploader.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <div>
      <div
        style={{ backgroundColor: '#e2e2e2', padding: '20px', margin: '10px' }}
      >
        <strong style={{ display: 'block' }}>Step 1 - Choose a file</strong>
        <br />
        <input
          type='file'
          id='fileinput'
          onChange={(e) => {
            setSelectedFile(e.target?.files?.[0]);
          }}
        />
      </div>
      <div
        style={{ backgroundColor: '#e2e2e2', padding: '20px', margin: '10px' }}
      >
        <strong style={{ display: 'block' }}>Step 2 - Monitor</strong>
        <br />
        <span id='output'>
          {pgvalue}% ({perf} sec)
        </span>
      </div>
    </div>
  );
};

export default UploadForm;
