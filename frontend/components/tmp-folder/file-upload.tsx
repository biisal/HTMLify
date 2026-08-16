import { FolderPlus, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

import { Button } from "../ui/button";
import { AddFolderForm } from "./add-folder-form";

function FileUpload() {
  const { addFiles, folder } = useTmpFolderStore();
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
        <div
          {...getRootProps()}
          className={"flex items-center justify-center w-full"}
        >
          <input className="hidden" {...getInputProps()} />
          <Button
            type="button"
            className={`w-full ${isDragActive && ""}`}
            variant={isDragActive ? "outline" : "default"}
          >
            {/* TODO: add better styling */}
            <UploadCloud className="size-4" />
            Upload Files
          </Button>
        </div>
      )}
    </section>
  );
}

export { FileUpload };
