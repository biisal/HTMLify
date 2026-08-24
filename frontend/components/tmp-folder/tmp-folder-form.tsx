"use client";

import { QRCode } from "@/components/qr-code";
import { env } from "@/lib/env";
import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

import { FileUpload } from "./file-upload";
import { ListFiles } from "./list-files";

const TmpFolderForm = () => {
  const { folder } = useTmpFolderStore();

  const url = folder?.id
    ? `${env.NEXT_PUBLIC_SITE_URL}/tmp/f/${folder.id}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start">
        <div className="w-full flex-1">
          <FileUpload />
        </div>
        {url && <QRCode url={url} fgColor="#000000" bgColor="#ffffff" />}
      </div>
      <ListFiles />
    </div>
  );
};

export default TmpFolderForm;
