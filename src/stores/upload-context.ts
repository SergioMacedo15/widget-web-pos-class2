import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { uploadFileToStorage } from "../http/upload-files-to-storage";
import { enableMapSet } from "immer";
import { CanceledError } from "axios";
import { useShallow } from "zustand/shallow";
import { compressImage } from "../utils/compress-image";

type UploadStatus = "progress" | "sucess" | "error" | "cancel";

export type Upload = {
   name: string;
   file: File;
   status: UploadStatus;
   abortController?: AbortController;
   originalSizeInBytes: number;
   compressedSizeInBytes?: number;
   uploadSizeInBytes: number;
   remoteUrl?: string;
};

type UploadStore = {
   uploads: Map<string, Upload>;
   addUploads: (files: File[]) => void;
   cancelUpload: (uploadID: string) => void;
   retryUpload: (uploadID: string) => void;
};

enableMapSet();

export const useUploads = create<UploadStore, [["zustand/immer", never]]>(
   immer((set, get) => {
      function updateUpload(uploadId: string, data: Partial<Upload>) {
         const upload = get().uploads.get(uploadId);
         if (!upload) {
            return;
         }
         set((state) => {
            state.uploads.set(uploadId, {
               ...upload,
               ...data,
            });
         });
      }

      async function processUpload(uploadId: string) {
         const upload = get().uploads.get(uploadId);
         if (!upload) {
            return;
         }
         const abortController = new AbortController();
         updateUpload(uploadId, {
            uploadSizeInBytes: 0,
            compressedSizeInBytes: undefined,
            remoteUrl: undefined,
            abortController,
            status: "progress",
         });
         try {
            const compressedFile = await compressImage({
               file: upload.file,
               maxHeight: 200,
               maxWidth: 200,
               quality: 0.5,
            });

            updateUpload(uploadId, {
               compressedSizeInBytes: compressedFile.size,
            });
            const { url } = await uploadFileToStorage(
               {
                  file: compressedFile,
                  onProgress(sizeInBytes) {
                     set((state) => {
                        state.uploads.set(uploadId, {
                           ...upload,
                           uploadSizeInBytes: sizeInBytes,
                        });
                     });
                  },
               },
               { signal: abortController.signal }
            );

            updateUpload(uploadId, { status: "sucess", remoteUrl: url });
         } catch (error) {
            const errorType: UploadStatus =
               error instanceof CanceledError ? "cancel" : "error";
            updateUpload(uploadId, { status: errorType });
         }
      }

      async function retryUpload(uploadId: string) {
         processUpload(uploadId);
      }
      function cancelUpload(uploadId: string) {
         const upload = get().uploads.get(uploadId);
         if (!upload) {
            return;
         }

         upload.abortController.abort();
         updateUpload(uploadId, { status: "cancel" });
      }

      function addUploads(files: File[]) {
         for (const file of files) {
            const uploadId = crypto.randomUUID();

            const upload: Upload = {
               name: file.name,
               file,
               status: "progress",
               originalSizeInBytes: file.size,
               uploadSizeInBytes: 0,
               compressedSizeInBytes: 0,
            };
            set((state) => {
               state.uploads.set(uploadId, upload);
            });
            processUpload(uploadId);
         }
      }
      return {
         uploads: new Map(),
         addUploads,
         processUpload,
         cancelUpload,
         retryUpload,
      };
   })
);

export const usePendingUploads = () => {
   return useUploads(
      useShallow((store) => {
         const isThereAnyPendingUploads = Array.from(
            store.uploads.values()
         ).some((upload) => upload.status === "progress");

         if (!isThereAnyPendingUploads) {
            return {
               isThereAnyPendingUploads,
               globalPercentage: 100,
            };
         }

         const { total, uploaded } = Array.from(store.uploads.values()).reduce(
            (acc, upload) => {
               if (upload.compressedSizeInBytes) {
                  acc.uploaded += upload.uploadSizeInBytes;
               }
               acc.total +=
                  upload.compressedSizeInBytes || upload.originalSizeInBytes;

               return acc;
            },
            {
               total: 0,
               uploaded: 0,
            }
         );
         const globalPercentage = Math.min(
            Math.round((uploaded * 100) / total),
            100
         );

         return {
            isThereAnyPendingUploads,
            globalPercentage: globalPercentage,
         };
      })
   );
};
