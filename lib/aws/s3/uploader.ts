interface UploaderOptions {
  useTransferAcceleration: boolean;
  chunkSize: number;
  threadsQuantity: number;
  file: File;
  baseURL: string;
}

type Part = {
  signedUrl: string;
  PartNumber: number;
};

// @see https://github.com/aws-samples/amazon-s3-multipart-upload-transfer-acceleration/blob/main/frontendV2/src/utils/upload.js
export class Uploader {
  useTransferAcceleration: boolean;
  chunkSize: number;
  threadsQuantity: number;
  timeout: number;
  file: File;
  aborted: boolean;
  uploadedSize: number;
  progressCache: Record<any, any>;
  activeConnections: Record<any, any>;
  parts: any[];
  uploadedParts: any[];
  fileId: string | null;
  fileKey: string | null;
  onProgressFn: (stats: {
    sent: number;
    total: number;
    percentage: number;
  }) => void;
  onErrorFn: (error: unknown) => void;
  baseURL: string;

  constructor(options: UploaderOptions) {
    this.useTransferAcceleration = options.useTransferAcceleration;
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = Math.max(
      1024 * 1024 * (options.chunkSize || 0),
      1024 * 1024 * 5
    );
    // number of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    // adjust the timeout value to activate exponential backoff retry strategy
    this.timeout = 0;
    this.file = options.file;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = null;
    this.fileKey = null;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.baseURL = options.baseURL;
  }

  start() {
    this.initialize();
  }

  async initialize() {
    try {
      // adding the the file extension (if present) to fileName
      const fileName = this.file.name;

      // initializing the multipart request
      const videoInitializationUploadInput = {
        name: fileName,
      };

      const initializeResponse = await fetch(
        `${this.baseURL}/api/aws/s3/multiPartUpload/initialize`,
        {
          method: 'POST',
          body: JSON.stringify(videoInitializationUploadInput),
        }
      );

      const AWSFileDataOutput = await initializeResponse.json();

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;

      // retrieving the pre-signed URLs
      const numberOfParts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfParts,
      };

      const urlsResponse = await fetch(
        `${this.baseURL}/api/aws/s3/preSignedUrls`,
        {
          method: 'POST',
          body: JSON.stringify(AWSMultipartFileDataInput),
        }
      );
      const urlsData = await urlsResponse.json();

      const newParts = urlsData.parts;
      this.parts.push(...newParts);

      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext(retry = 0) {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          if (retry <= 6) {
            retry += 1;
            const wait = (ms: number) =>
              new Promise((res) => {
                setTimeout(res, ms);
              });

            // exponential backoff retry before giving up
            console.log(
              `Part#${part.PartNumber} failed to upload, backing off ${
                2 ** retry * 100
              } before retrying...`
            );
            wait(2 ** retry * 100).then(() => {
              this.parts.push(part);
              this.sendNext(retry);
            });
          } else {
            console.log(`Part#${part.PartNumber} failed to upload, giving up`);
            this.complete(error);
          }
        });
    }
  }

  async complete(error?: unknown) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (err) {
      this.onErrorFn(err);
    }
  }

  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: this.uploadedParts,
      };

      await fetch(`${this.baseURL}/api/aws/s3/multiPartUpload/finalize`, {
        method: 'POST',
        body: JSON.stringify(videoFinalizationMultiPartInput),
      });
    }
  }

  sendChunk(chunk: Blob, part: Part, sendChunkStarted: () => void) {
    return new Promise<void>((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error('Failed chunk upload'));
            return;
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  handleProgress(
    part: number,
    event: ProgressEvent<XMLHttpRequestEventTarget>
  ) {
    if (this.file) {
      if (
        event.type === 'progress' ||
        event.type === 'error' ||
        event.type === 'abort'
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === 'uploaded') {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => {
          return memo + this.progressCache[id];
        }, 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent,
        total,
        percentage,
      });
    }
  }

  upload(file: Blob, part: Part, sendChunkStarted: () => void) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      const throwXHRError = (
        error: unknown,
        errorPart: Part,
        abortFx: () => void
      ) => {
        delete this.activeConnections[errorPart.PartNumber - 1];
        reject(error);
        window.removeEventListener('offline', abortFx);
      };
      if (this.fileId && this.fileKey) {
        if (!window.navigator.onLine) reject(new Error('System is offline'));

        const xhr = new XMLHttpRequest();
        this.activeConnections[part.PartNumber - 1] = xhr;
        xhr.timeout = this.timeout;
        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener('progress', progressListener);

        xhr.addEventListener('error', progressListener);
        xhr.addEventListener('abort', progressListener);
        xhr.addEventListener('loadend', progressListener);

        xhr.open('PUT', part.signedUrl);
        const abortXHR = () => xhr.abort();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader('ETag');

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ''),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
              window.removeEventListener('offline', abortXHR);
            }
          }
        };

        xhr.onerror = (error) => {
          throwXHRError(error, part, abortXHR);
        };
        xhr.ontimeout = (error) => {
          throwXHRError(error, part, abortXHR);
        };
        xhr.onabort = () => {
          throwXHRError(
            new Error('Upload canceled by user or system'),
            part,
            abortXHR
          );
        };
        window.addEventListener('offline', abortXHR);
        xhr.send(file);
      }
    });
  }

  onProgress(
    onProgress: (stats: {
      sent: number;
      total: number;
      percentage: number;
    }) => void
  ) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: (error: unknown) => void) {
    this.onErrorFn = onError;
    return this;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}
