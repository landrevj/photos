import { RootState } from '../..';

export const getUploaderFiles = (state: RootState) => {
  return state.uploader.currentFiles;
};

export const getFileProgressMap = (state: RootState) => {
  return state.uploader.fileProgress;
};

export const getFileProgress = (state: RootState, uuid: string) => {
  return state.uploader.fileProgress[uuid];
};

export const getFileMetadataMap = (state: RootState) => {
  return state.uploader.fileMetadata;
};

export const getFileMetadata = (state: RootState, uuid: string) => {
  return state.uploader.fileMetadata[uuid];
};

export const getUploadFileMetadataToDBStatus = (state: RootState) => {
  return state.uploader.uploadFileMetadataToDB.status;
};
