'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

/** external components */
import { MdCloudUpload } from '@/lib/icons';

/** components */
import { Dialog, Title } from '@/components/common/Dialog/Dialog';
import Button from '@/components/common/Button/Button';
import ImagePreview from './ImagePreview/ImagePreview';
import MetadataEditForm from '@/components/ImageView/MetadataEditForm/MetadataEditForm';

/** state */
import {
  getFileMetadataMap,
  getUploaderFiles,
  getUploadFileMetadataToDBStatus,
} from '@/lib/redux/state/uploader/uploader.selectors';
import {
  uploadFileMetadataToDB,
  uploadFilesToAws,
} from '@/lib/redux/state/uploader/uploader.slice';
import { useDispatch, useSelector } from '@/lib/redux';

/** helpers */

/** types */
interface UploadFormProps {
  onCancel: () => void;
}

export const UploadForm = ({ onCancel }: UploadFormProps) => {
  const dispatch = useDispatch();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      dispatch(uploadFilesToAws(acceptedFiles));
    },
    [dispatch]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const metadataMap = useSelector(getFileMetadataMap);
  const uploaderFiles = useSelector(getUploaderFiles);
  const uploadFileMetadataToDBStatus = useSelector(
    getUploadFileMetadataToDBStatus
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<
    { file: File; uuid: string } | undefined
  >();

  return (
    <div className='flex h-full flex-col gap-8 px-9 pb-9 pt-12 xl:flex-row'>
      <div className='top-12 flex w-full flex-col gap-6 xl:sticky xl:h-[calc(100vh-5.25rem)] xl:basis-1/3'>
        <Title>
          <h1 className='text-4xl font-semibold'>Upload</h1>
        </Title>
        <div
          className='border-radius-2 flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-400'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <span className='italic text-neutral-500'>
            Drop images here to upload...
          </span>
        </div>
        <div className='flex flex-1 flex-col overflow-y-hidden'>
          <h2 className='text-lg'>Images</h2>
          <hr className='mb-4' />
          <div className='grid flex-1 grid-cols-2 items-start gap-2 overflow-y-auto overflow-x-visible overscroll-contain sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
            {uploaderFiles.map(({ file, uuid }) => (
              <button
                className='relative transition-opacity hover:opacity-80'
                type='button'
                onClick={() => {
                  setSelectedFile({ file, uuid });
                  setIsDialogOpen(true);
                }}
              >
                <ImagePreview uuid={uuid} key={uuid} />
              </button>
            ))}
          </div>
          <div className='flex w-full justify-end gap-2 pt-4'>
            <Button
              color='outline'
              className='text-neutral-500 transition-colors hover:text-red-500'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={
                !uploaderFiles.length ||
                uploaderFiles.some(({ uuid }) => !metadataMap[uuid])
              }
              color='primary'
              icon={<MdCloudUpload />}
              isLoading={uploadFileMetadataToDBStatus === 'pending'}
              onClick={() => {
                dispatch(
                  uploadFileMetadataToDB({
                    uuids: uploaderFiles.map((file) => file.uuid),
                  })
                );
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
      <div className='hidden h-fit flex-1 overflow-x-hidden xl:block'>
        <MetadataEditForm
          file={selectedFile?.file}
          uuid={selectedFile?.uuid}
          className='-mx-9 h-full overflow-hidden rounded-xl text-white md:mx-0'
        />
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isFullscreen
        className='xl:hidden'
      >
        <MetadataEditForm
          className='h-full overflow-hidden text-white'
          file={selectedFile?.file}
          uuid={selectedFile?.uuid}
        />
      </Dialog>
    </div>
  );
};

export default UploadForm;
