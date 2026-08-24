import { Check, Copy, FolderPlus, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";
import { cn } from "@/lib/utils";

import { AddFolderForm } from "./add-folder-form";

function FileUpload() {
  const { addFiles, folder, url, copied, copyUrl } = useTmpFolderStore();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => addFiles(files),
  });

  return (
    <section>
      {!folder?.name ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
          <FolderPlus className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Make a folder to upload files
          </p>
          <AddFolderForm />
        </div>
      ) : (
        <div className="space-y-3">
          {url && (
            <div className="flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-2">
              <p className="min-w-0 flex-1 select-all truncate font-mono text-xs text-muted-foreground">
                {url}
              </p>
              <button
                type="button"
                onClick={copyUrl}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                title={copied ? "Copied!" : "Copy URL"}
              >
                {copied ? (
                  <Check className="size-3.5 text-primary" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          )}
          <div
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/30",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive
                  ? "Drop files here"
                  : "Drag & drop files here, or click to select"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { FileUpload };
