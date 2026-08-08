"use client";

import { FileUpload } from "./file-upload";
import { ListFiles } from "./list-files";

const TmpFolderForm = () => {
  return (
    <div className="flex flex-col gap-6">
      <FileUpload />
      <ListFiles />
    </div>
  );
};

export default TmpFolderForm;
