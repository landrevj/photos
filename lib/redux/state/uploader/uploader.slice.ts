import { createAsyncThunk, createSlice, PayloadAction } from '@/lib/redux';
import { getFileMetadata, getFileProgress } from './uploader.selectors';
import type { Image } from '@/types/images';
import { Uploader } from '@/lib/aws/s3/uploader';
import type { UploaderState } from './uploader.types';
import { v4 as uuid } from 'uuid';

const initialState: UploaderState = {
  currentFiles: [],
  fileProgress: {},
  fileMetadata: {},
  uploadFileMetadataToDB: {
    status: 'idle',
    error: null,
  },
};

export const uploadFilesToAws = createAsyncThunk(
  'uploader/uploadFiles',
  (files: File[], { dispatch }) => {
    const filesWithUuids = files.map((file) => ({ file, uuid: uuid() }));

    dispatch(addFiles(filesWithUuids));

    filesWithUuids.forEach(({ file, uuid }) => {
      const uploader = new Uploader({
        file,
        chunkSize: Number(process.env.NEXT_PUBLIC_UPLOAD_PART_SIZE ?? 5),
        threadsQuantity: Number(process.env.NEXT_PUBLIC_UPLOAD_THREADS ?? 1),
        useTransferAcceleration: false,
        useUUIDForKey: true,
        uuid,
      });
      let percentage = 0;
      uploader
        .onProgress(({ percentage: newPercentage }: { percentage: number }) => {
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            dispatch(setFileProgress({ uuid, progress: percentage }));
          }
        })
        .onSuccess(async ({ awsFilename }) => {
          dispatch(setFileAwsFilename({ uuid, awsFilename }));
        })
        .onError((error) => {
          console.error(error);
        });
      uploader.start();
    });
  }
);

export const uploadFileMetadataToDB = createAsyncThunk(
  'uploader/uploadFileMetadataToDB',
  ({ uuids }: { uuids: string[] }, { getState }) => {
    const promises = uuids.map((uuid) => {
      const metadata = getFileMetadata(getState(), uuid);
      const { awsFilename } = getFileProgress(getState(), uuid);
      if (!awsFilename) return null;

      return fetch('/api/images', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          awsFilename,
          ...metadata,
        }),
      });
    });
    return Promise.all(promises);
  }
);

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    addFiles: (
      state,
      { payload }: PayloadAction<{ file: File; uuid: string }[]>
    ) => {
      state.currentFiles = [...state.currentFiles, ...payload];
    },
    setFileProgress: (
      state,
      { payload }: PayloadAction<{ uuid: string; progress: number }>
    ) => {
      state.fileProgress[payload.uuid] = {
        ...state.fileProgress[payload.uuid],
        progress: payload.progress,
      };
    },
    setFileAwsFilename: (
      state,
      { payload }: PayloadAction<{ uuid: string; awsFilename: string }>
    ) => {
      state.fileProgress[payload.uuid] = {
        ...state.fileProgress[payload.uuid],
        awsFilename: payload.awsFilename,
      };
    },
    setFileMetadata: (
      state,
      { payload }: PayloadAction<{ uuid: string; metadata: Partial<Image> }>
    ) => {
      state.fileMetadata[payload.uuid] = payload.metadata;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileMetadataToDB.pending, (state) => {
        state.uploadFileMetadataToDB.status = 'pending';
      })
      .addCase(uploadFileMetadataToDB.fulfilled, (state) => {
        state.uploadFileMetadataToDB.status = 'fulfilled';
      })
      .addCase(uploadFileMetadataToDB.rejected, (state) => {
        state.uploadFileMetadataToDB.status = 'rejected';
      });
  },
});

export default uploaderSlice.reducer;
export const {
  addFiles,
  setFileAwsFilename,
  setFileProgress,
  setFileMetadata,
} = uploaderSlice.actions;
