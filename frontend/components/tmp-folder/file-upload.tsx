import { FolderPlus, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";
import { cn } from "@/lib/utils";

import { AddFolderForm } from "./add-folder-form";

function FileUpload() {
  const { addFiles, folder } = useTmpFolderStore();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => addFiles(files),
  });

  return (
    <section className="w-full h-full flex items-center justify-center">
      {!folder?.name ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <FolderPlus className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Make a folder to upload files
          </p>
          <AddFolderForm />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "m-4 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 text-muted-foreground transition-colors",
            isDragActive && "border-primary bg-primary/5 text-primary",
          )}
        >
          <input className="hidden" {...getInputProps()} />
          <UploadCloud className="size-8" />
          <p className="text-sm">
            {isDragActive
              ? "Drop files to upload"
              : "Drag and drop files here, or click to browse"}
          </p>
        </div>
      )}
    </section>
  );
}

export { FileUpload };
