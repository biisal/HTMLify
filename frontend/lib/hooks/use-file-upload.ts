import { create } from "zustand";

import { uploadFileWithProgress } from "@/lib/modules/file/file.api";
import { FileIDResponse } from "@/lib/modules/file/file.types";

type UploadStatus = "queued" | "uploading" | "completed" | "failed";

interface UploadItem {
  id: string;
  file: File;
  path: string;
  progress: number;
  status: UploadStatus;
  response?: FileIDResponse;
}

interface FileUploadStore {
  queue: UploadItem[];
  isUploading: boolean;

  addFiles: (files: File[], folderPath: string) => void;
  startQueue: () => Promise<void>;
  updateProgress: (id: string, progress: number) => void;
  updateItem: (id: string, updates: Partial<UploadItem>) => void;
  clearQueue: () => void;
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  queue: [],
  isUploading: false,

  addFiles: (files, folderPath) => {
    const newItems: UploadItem[] = files.map((file) => {
      const fullPath = folderPath
        ? `${folderPath.replace(/\/$/, "")}/${file.name}`
        : file.name;
      return {
        id: crypto.randomUUID(),
        file,
        path: fullPath,
        progress: 0,
        status: "queued" as const,
      };
    });

    set((state) => ({
      queue: [...state.queue, ...newItems],
    }));

    void get().startQueue();
  },

  startQueue: async () => {
    if (get().isUploading) return;
    set({ isUploading: true });

    try {
      while (true) {
        const { queue } = get();
        const next = queue.find((item) => item.status === "queued");
        if (!next) break;

        set((state) => ({
          queue: state.queue.map((item) =>
            item.id === next.id ? { ...item, status: "uploading" as const } : item,
          ),
        }));

        try {
          const formData = new FormData();
          formData.append("file", next.file);
          formData.append("path", next.path);
          formData.append("visibility", "public");
          formData.append("mode", "source");

          const { data, error } = await uploadFileWithProgress(formData, {
            onProgress: (progress) => {
              get().updateProgress(next.id, progress);
            },
          });

          if (error || !data) {
            throw new Error(error || "Upload failed");
          }

          get().updateItem(next.id, {
            status: "completed",
            progress: 100,
            response: data,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          set((state) => ({
            queue: state.queue.map((item) =>
              item.id === next.id
                ? { ...item, status: "failed" as const }
                : item,
            ),
          }));
          console.error(`${next.file.name}: ${message}`);
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

  updateItem: (id, updates) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })),

  clearQueue: () => set({ queue: [] }),
}));