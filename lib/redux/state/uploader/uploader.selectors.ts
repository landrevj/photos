import { RootState } from '../..';

export const getUploaderFiles = (state: RootState) => {
  return state.uploader.currentFiles;
};

export const getFileProgressMap = (state: RootState) => {
  return state.uploader.fileProgress;
};

export const getFileMetadata = (state: RootState, uuid: string) => {
  return state.uploader.fileMetadata[uuid];
};
