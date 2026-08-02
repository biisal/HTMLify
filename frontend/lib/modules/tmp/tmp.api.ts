import { env } from "@/lib/env";
import { APICall } from "@/lib/fetch/api";

import { TmpFile, TmpFormType } from "./tmp.types";

export const createTmpFile = async (
  data: TmpFormType,
): Promise<{ data: TmpFile | null; error: string | null }> => {
  const formData = new FormData();
  if (data.file) {
    formData.append("file", data.file);
  }
  if (data.name) {
    formData.append("name", data.name);
  }
  formData.append("expiry", data.expiry.toString());

  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/tmp-files`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (error || !response) {
    return {
      data: null,
      error: error || "Failed to create temporary file link",
    };
  }

  return { data: (await response.json()) as TmpFile, error: null };
};
