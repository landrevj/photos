'use client';

import { useEffect, useState } from 'react';
// import ImageJs from 'image-js';

/** external components */

/** components */

/** state */

/** helpers */
// import { getImageColors } from '@/lib/images/utils';
import { Uploader } from '@/lib/aws/s3/uploader';

/** types */
// interface UploadFormProps {
//   onSuccess: () => void;
// }

// export const UploadForm = ({onSuccess }: UploadFormProps) => {
export const UploadForm = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [pgvalue, setPgvalue] = useState<number | undefined>(undefined);
  const [perf, setPerf] = useState<string | number | undefined>(undefined);

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
        // .onSuccess(async (image) => {
        //   const img = await ImageJs.load(await image.file.arrayBuffer());
        //   await fetch('/api/images', {
        //     method: 'PUT',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({
        //       awsFilename: image.awsFilename,
        //       name: image.file.name,
        //       width: img.width,
        //       height: img.height,
        //       size: img.size,
        //       histogram: img.getHistograms(),
        //       meta: {
        //         // @ts-ignore
        //         exif: img.meta?.exif?.map,
        //         // @ts-ignore
        //         tiff: img.meta?.tiff?.tags,
        //       },
        //       colors: await getImageColors(img),
        //     }),
        //   });
        //   onSuccess();
        // })
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
        <strong style={{ display: 'block' }}>Step 1 - Choose a file</strong>
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
