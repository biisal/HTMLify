import { env } from "@/lib/env";
import { APICall } from "@/lib/fetch/api";
import {
  SearchQuery,
  SearchResponse,
} from "@/lib/modules/search/search.schema";

async function searchFiles(data: SearchQuery) {
  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/search`);
  url.searchParams.set("q", data.query);
  url.searchParams.set("page", data.page.toString());
  url.searchParams.set("page_size", data.page_size.toString());
  const { response, error } = await APICall(url.toString());
  if (error || !response) {
    return { data: null, error: error || "Failed to search files" };
  }
  return {
    data: (await response.json()) as SearchResponse,
    error: null,
  };
}

export { searchFiles };
