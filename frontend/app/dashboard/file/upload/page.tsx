import { redirect } from "next/navigation";

import { DasshboardNavbar } from "@/components/dashboard/dashbaord-navbar";
import { FileUpload } from "@/components/file/upload/files-upload";
import { getMe } from "@/lib/modules/user/user.actions";

const UploadPage = async () => {
  const user = await getMe();
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <DasshboardNavbar title="Upload Files" />
      <div className="w-full max-w-7xl mx-auto pt-10 px-4">
        <FileUpload user={user} />
      </div>
    </>
  );
};

export default UploadPage;
