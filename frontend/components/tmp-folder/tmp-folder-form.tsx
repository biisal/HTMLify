"use client";

import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";
import { FileUpload } from "./file-upload";
import { ListFiles } from "./list-files";
import { AddFolderForm } from "./add-folder-form";

const TmpFolderForm = () => {
  const { folder } = useTmpFolderStore();
  return (
    <div className="flex-1 h-full w-full flex">
      <div className="h-full w-full flex  items-center justify-center">
        <FileUpload />
      </div>
      <div className="flex-1  h-full p-2">
        <ListFiles />
      </div>
    </div>
  );
};

export default TmpFolderForm;
