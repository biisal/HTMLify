import { env } from "@/lib/env";
import { APICall } from "@/lib/fetch/api";
import { FramesFeedResponse } from "@/lib/modules/frames/frames.types";

const getFramesFeed = async (n: number) => {
  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/internal/frames/feed?n=${n}`,
  );
  if (error || !response) {
    return [];
  }
  return (await response.json()) as Promise<FramesFeedResponse[]>;
};

export { getFramesFeed };
