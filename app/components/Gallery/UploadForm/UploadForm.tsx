'use client';

import { useCallback, useState } from 'react';

/** external components */

/** components */
import ImagePreview from './ImagePreview/ImagePreview';
import MetadataEditForm from '../../ImageView/MetadataEditForm/MetadataEditForm';
import { Dialog, Title } from '@/components/common/Dialog/Dialog';

/** state */
import { useDispatch, useSelector } from '@/lib/redux';
import { getUploaderFiles } from '@/lib/redux/state/uploader/uploader.selectors';
import { uploadFiles } from '@/lib/redux/state/uploader/uploader.slice';

/** helpers */
import { useDropzone } from 'react-dropzone';

/** types */
interface UploadFormProps {
  onSuccess: () => void;
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const dispatch = useDispatch();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      dispatch(uploadFiles(acceptedFiles));
    },
    [dispatch]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const uploaderFiles = useSelector(getUploaderFiles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<
    { file: File; uuid: string } | undefined
  >();

  console.log(selectedFile);
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
        <div className='flex flex-col overflow-y-hidden'>
          <h2 className='text-lg'>Images</h2>
          <hr className='mb-4' />
          <div className='grid grid-cols-2 items-start gap-2 overflow-y-auto overflow-x-visible overscroll-contain sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
            {uploaderFiles.map(({ file, uuid }, i) => (
              <button
                className='relative'
                type='button'
                onClick={() => {
                  setSelectedFile({ file, uuid });
                  setIsDialogOpen(true);
                }}
              >
                <ImagePreview uuid={uuid} key={i} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='hidden h-fit flex-1 xl:block'>
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
