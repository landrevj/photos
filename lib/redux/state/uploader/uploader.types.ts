import type { Image } from '@/types/images';
import { ThunkStatus } from '../..';

type Progress = {
  awsFilename?: string;
  progress: number;
};

export interface UploaderState {
  currentFiles: { file: File; uuid: string }[];
  fileProgress: Record<string, Progress>;
  fileMetadata: Record<string, Partial<Image>>;
  uploadFileMetadataToDB: ThunkStatus;
}
