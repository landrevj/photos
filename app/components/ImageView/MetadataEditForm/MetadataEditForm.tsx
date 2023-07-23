'use client';

import { useState } from 'react';

/** external components */
import { Map, Marker } from 'pigeon-maps';
import { MdAutoAwesome, MdEdit, MdLocationPin } from '@/lib/icons';
import NextImage from 'next/image';
import { ParentSize } from '@visx/responsive';

/** components */
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Histogram from '@/components/common/Histogram/Histogram';
import Switch from '@/components/common/Switch/Switch';

/** state */
import {
  getFileMetadata,
  getFileProgressMap,
} from '@/lib/redux/state/uploader/uploader.selectors';
import { useDispatch, useSelector } from '@/lib/redux';
import { setFileMetadata } from '@/lib/redux/state/uploader/uploader.slice';

/** helpers */
import { createImageColorDataUrl, getImageFileData } from '@/lib/images/utils';
import { bytesToMB } from '@/lib/math';

/** types */
interface MetadataEditFormProps {
  file?: File;
  uuid?: string;
  className?: string;
}

export const MetadataEditForm = ({
  className,
  file,
  uuid,
}: MetadataEditFormProps) => {
  const dispatch = useDispatch();
  const metadata =
    useSelector((state) => getFileMetadata(state, uuid || '')) || {};
  const fileProgress = useSelector(getFileProgressMap);
  const [isProcessing, setIsProcessing] = useState(false);
  const state = fileProgress[uuid || ''];

  if (!file || !uuid) return null;

  console.log(metadata);

  return (
    <div
      className={className}
      style={{ backgroundColor: metadata.colors?.dominant || '#000' }}
    >
      <div className='flex h-full w-full flex-col flex-wrap gap-4 bg-gradient-to-tr from-[#000000aa] to-[#00000066] p-8'>
        <div className='flex flex-wrap justify-between'>
          <div className='flex items-center gap-3 text-2xl'>
            <h3 className=' ont-semibold'>{file.name}</h3>
            <MdEdit />
          </div>
          <Button
            color='outline'
            icon={<MdAutoAwesome />}
            onClick={async () => {
              setIsProcessing(true);
              dispatch(
                setFileMetadata({
                  uuid,
                  metadata: await getImageFileData(file),
                })
              );
              setIsProcessing(false);
            }}
            isLoading={isProcessing}
          >
            Process
          </Button>
        </div>
        <div className='flex flex-1 flex-wrap gap-8'>
          <div className='flex flex-1 flex-col gap-8'>
            <Card
              className='flex justify-between gap-2'
              style={{ backgroundColor: `${metadata.colors?.dominant}ee` }}
            >
              <span>
                {metadata.width}
                <span className='opacity-75'>x</span>
                {metadata.height}
              </span>
              <span>
                {bytesToMB(metadata.size || 0).toFixed(2)}{' '}
                <span className='opacity-75'>MB</span>
              </span>
            </Card>
            <div className='flex flex-col gap-2'>
              <Switch label='Allow on homepage' />
              <div className='relative flex h-52 items-center justify-center overflow-hidden rounded-xl drop-shadow'>
                <NextImage
                  className='object-cover'
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${state?.awsFilename}`}
                  alt='hero preview'
                  fill
                  blurDataURL={createImageColorDataUrl(
                    metadata?.colors?.dominant || '#2e2e2e',
                    100,
                    100
                  )}
                  placeholder='blur'
                  sizes='25vw'
                />
                <div
                  className='absolute inset-0'
                  style={{
                    background: `linear-gradient(45deg, ${metadata?.colors?.dominant}33, ${metadata?.colors?.complement}66)`,
                  }}
                />
                <div className='relative w-full break-words p-10 text-center'>
                  <span className='break-all text-5xl font-extrabold text-white mix-blend-difference'>
                    landrevj.photos
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h4>Colors</h4>
              <div className='flex flex-1 gap-2'>
                <div
                  className='flex flex-1 items-center justify-center rounded-xl p-2 text-center drop-shadow'
                  style={{ backgroundColor: metadata.colors?.dominant }}
                >
                  <span className='italic'>dominant</span>
                </div>
                <div
                  className='flex flex-1 items-center justify-center rounded-xl p-2 text-center drop-shadow'
                  style={{ backgroundColor: metadata.colors?.complement }}
                >
                  <span className='italic'>complement</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h4>Histogram</h4>
              <Card className='h-32 overflow-hidden bg-neutral-800 p-0'>
                <ParentSize>
                  {({ width }) =>
                    metadata.histogram && (
                      <Histogram
                        data={metadata.histogram}
                        width={width}
                        height={128}
                      />
                    )
                  }
                </ParentSize>
              </Card>
            </div>
            <div className='flex h-80 flex-col gap-2'>
              <h4>GPS</h4>
              <div className='flex-1 overflow-hidden rounded-xl drop-shadow'>
                <Map
                  key={`${metadata.gps?.latitude}x${metadata.gps?.longitude}`}
                  defaultCenter={[
                    metadata.gps?.latitude || 0,
                    metadata.gps?.longitude || 0,
                  ]}
                  defaultZoom={15}
                >
                  <Marker
                    width={36}
                    anchor={[
                      metadata.gps?.latitude || 0,
                      metadata.gps?.longitude || 0,
                    ]}
                  >
                    <MdLocationPin className='text-4xl text-red-600' />
                  </Marker>
                </Map>
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-4'>
            <div>
              <h4>EXIF</h4>
              <hr className='border-white border-opacity-50' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataEditForm;
