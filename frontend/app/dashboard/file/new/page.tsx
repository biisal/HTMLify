import { redirect } from "next/navigation";

import { DasshboardNavbar } from "@/components/dashboard/dashbaord-navbar";
import { FileForm } from "@/components/file/file-upload-form";
import { getMe } from "@/lib/modules/user/user.actions";

export default async function NewFileCreatePage() {
  const user = await getMe();
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <DasshboardNavbar title="New File" />
      <div className="w-full max-w-7xl mx-auto pt-10 px-4">
        <FileForm mode="upload" user={user} />
      </div>
    </>
  );
}
