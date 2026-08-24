import { redirect } from "next/navigation";

import { FileUpload } from "@/components/file/upload/files-upload";
import { PageShell } from "@/components/page-shell";
import { getMe } from "@/lib/modules/user/user.actions";

const UploadPage = async () => {
  const user = await getMe();
  if (!user) {
    redirect("/");
  }
  return (
    <PageShell
      title="Upload Files"
      description="Drag and drop files to upload them to your workspace."
    >
      <FileUpload user={user} />
    </PageShell>
  );
};

export default UploadPage;
