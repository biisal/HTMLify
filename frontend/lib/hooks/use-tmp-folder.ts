import { create } from "zustand";
import { TmpFolderResponse } from "../tmp-folder/tmp-folder.types";
import { APICall } from "../fetch/api";
import { env } from "../env";

type UploadStatus = "queued" | "uploading" | "completed" | "failed";

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
}

interface FolderAuth {
  folderName: string;
  folderId: string;
}

interface TmpFolderStore {
  folder: FolderAuth;
  setFolder: (name: string, folderId?: string) => void;

  queue: UploadItem[];
  isUploading: boolean;

  addFiles: (files: File[]) => void;
  startQueue: () => Promise<void>;
  updateProgress: (id: string, progress: number) => void;
}

export const useTmpFolderStore = create<TmpFolderStore>((set, get) => ({
  folder: {
    folderName: "test",
    folderId: "",
  },

  setFolder: (folderName, folderId = "") =>
    set({
      folder: {
        folderName,
        folderId,
      },
    }),

  queue: [],
  isUploading: false,

  addFiles: (files) => {
    set((state) => ({
      queue: [
        ...state.queue,
        ...files.map((file) => ({
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: "queued" as const,
        })),
      ],
    }));

    void get().startQueue();
  },

  startQueue: async () => {
    if (get().isUploading) return;

    set({ isUploading: true });

    try {
      while (true) {
        const { queue, folder } = get();

        const next = queue.find((item) => item.status === "queued");
        if (!next) break;

        set((state) => ({
          queue: state.queue.map((item) =>
            item.id === next.id ? { ...item, status: "uploading" } : item,
          ),
        }));

        try {
          let folderId = folder.folderId;

          if (!folderId) {
            if (!folder.folderName) {
              throw new Error("Folder name is required");
            }

            const { data, error } = await createTmpFolder(folder.folderName);

            if (error || !data) {
              throw new Error(error ?? "Failed to create folder");
            }

            folderId = data.id;

            set({
              folder: {
                folderName: folder.folderName,
                folderId,
              },
            });
          }

          await uploadFile(next, folderId, (progress) => {
            get().updateProgress(next.id, progress);
          });

          set((state) => ({
            queue: state.queue.map((item) =>
              item.id === next.id
                ? {
                    ...item,
                    status: "completed",
                    progress: 100,
                  }
                : item,
            ),
          }));
        } catch (err) {
          console.error(err);

          set((state) => ({
            queue: state.queue.map((item) =>
              item.id === next.id
                ? {
                    ...item,
                    status: "failed",
                  }
                : item,
            ),
          }));
        }
      }
    } finally {
      set({ isUploading: false });
    }
  },

  updateProgress: (id, progress) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, progress } : item,
      ),
    })),
}));

export const createTmpFolder = async (
  folderName: string,
): Promise<{ data: TmpFolderResponse | null; error: string | null }> => {
  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/tmp-folders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: folderName }),
    },
  );
  if (error || !response) {
    return { data: null, error: error || "Failed to create temporary folder" };
  }
  return { data: (await response.json()) as TmpFolderResponse, error: null };
};

const uploadFile = (
  item: UploadItem,
  folderId: string,
  onProgress: (progress: number) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    const formData = new FormData();

    console.log({ item, folderId });

    formData.append("file", item.file);
    formData.append("folderId", folderId);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;

      onProgress(Math.round((e.loaded * 100) / e.total));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  });
};
