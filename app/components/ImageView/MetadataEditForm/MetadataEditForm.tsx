'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import tinycolor from 'tinycolor2';

/** external components */
import { MdAutoAwesome, MdEdit } from '@/lib/icons';

/** components */
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import ClickToEditTextInput from '@/components/common/ClickToEditTextInput/ClickToEditTextInput';
import ColorInputs from './ColorInputs/ColorInputs';
import ExifInput from './ExifInput/ExifInput';
import GpsInput from './GpsInput/GpsInput';
import HistogramInput from './HistogramInput/HistogramInput';
import HomepageToggle from './HomepageToggle/HomepageToggle';

/** state */
import {
  getFileMetadata,
  getFileProgressMap,
} from '@/lib/redux/state/uploader/uploader.selectors';
import { useDispatch, useSelector } from '@/lib/redux';
import { setFileMetadata } from '@/lib/redux/state/uploader/uploader.slice';

/** helpers */
import { bytesToMB } from '@/lib/math';
import { getImageFileData } from '@/lib/images/utils';

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
  const metadata = useSelector(
    (state) => getFileMetadata(state, uuid || '') ?? {}
  );
  const fileProgress = useSelector(getFileProgressMap);
  const [isProcessing, setIsProcessing] = useState(false);
  const [yMaxMaximum, setYMaxMaximum] = useState(metadata.histogram?.yMax ?? 0);
  const state = fileProgress[uuid || ''];

  useEffect(() => {
    setYMaxMaximum((metadata.histogram?.yMax ?? 0) * 2);
  }, [uuid]);

  if (!file || !uuid) return null;

  return (
    <div
      className={className}
      style={{ backgroundColor: metadata.colors?.dominant || '#000' }}
    >
      <div className='flex h-full w-full flex-col flex-wrap gap-4 bg-gradient-to-tr from-[#000000aa] to-[#00000066] p-8'>
        <div className='flex max-w-full justify-between gap-4 overflow-hidden'>
          <div className='flex shrink items-center gap-3 overflow-hidden text-2xl'>
            <ClickToEditTextInput
              className='overflow-hidden'
              value={metadata.name}
              onChange={(event) => {
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      name: event.target.value ?? metadata.name,
                    },
                  })
                );
              }}
            />
            {/* <h3 className=' ont-semibold'>{file.name}</h3> */}
            <MdEdit className='flex-none' />
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
              className={clsx(
                'flex justify-between gap-2',
                tinycolor(metadata.colors?.dominant).isLight() && 'text-black'
              )}
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
            <HomepageToggle
              awsFilename={state?.awsFilename}
              formValues={metadata}
              onChange={(value) =>
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      isAllowedOnHomepage: value,
                    },
                  })
                )
              }
            />
            <ColorInputs
              formValues={metadata}
              onDominantChange={(color, areColorsSynced) =>
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      colors: {
                        dominant: color,
                        complement: areColorsSynced
                          ? tinycolor(color).complement().toHexString()
                          : metadata.colors!.complement,
                      },
                    },
                  })
                )
              }
              onComplementChange={(color, areColorsSynced) =>
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      colors: {
                        complement: color,
                        dominant: areColorsSynced
                          ? tinycolor(color).complement().toHexString()
                          : metadata.colors!.dominant,
                      },
                    },
                  })
                )
              }
              onLockChange={(areColorsSynced) => {
                if (areColorsSynced) {
                  dispatch(
                    setFileMetadata({
                      uuid,
                      metadata: {
                        ...metadata,
                        colors: {
                          ...metadata.colors!,
                          complement: tinycolor(metadata.colors?.dominant)
                            .complement()
                            .toHexString(),
                        },
                      },
                    })
                  );
                }
              }}
            />
            <HistogramInput
              max={yMaxMaximum}
              formValues={metadata}
              onChange={(event) => {
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      histogram: {
                        ...metadata.histogram!,
                        yMax:
                          Number(event.target.value) ??
                          metadata.histogram?.yMax,
                      },
                    },
                  })
                );
              }}
            />
            <GpsInput
              formValues={metadata}
              onDropPin={(latitude, longitude) => {
                dispatch(
                  setFileMetadata({
                    uuid,
                    metadata: {
                      ...metadata,
                      gps: { latitude, longitude },
                    },
                  })
                );
              }}
            />
          </div>
          <ExifInput formValues={metadata} />
        </div>
      </div>
    </div>
  );
};

export default MetadataEditForm;
