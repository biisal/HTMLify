"use client";

import { FileUpload } from "./file-upload";
import { ListFiles } from "./list-files";

interface UploadSuccessResponse {
  id: string;
  name: string;
  url: string;
  expiry: string;
}

const TmpFolderForm = () => {
  return (
    <div className="flex-1 h-full w-full flex">
      <div className="w-3/4 h-full flex  items-center justify-center">
        <FileUpload folderName={"folderName"} />
      </div>
      <div className="flex-1 h-full p-2">
        <ListFiles />
      </div>
    </div>
  );
};

export default TmpFolderForm;
