import axios from "axios";

interface UploadFilesToStorage {
  file: File;
  onProgress: (sizeInBytes: number) => void;
}

interface UploadFileToStoreOptions {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFilesToStorage,
  opts?: UploadFileToStoreOptions
) {
  const data = new FormData();

  data.append("file", file);

  const response = await axios.post<{ url: string }>(
    "http://localhost:3333/uploads",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: opts?.signal,
      onUploadProgress(progressEvent) {
        onProgress(progressEvent.loaded);
      },
    }
  );
  return { url: response.data.url };
}
