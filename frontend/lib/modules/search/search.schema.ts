import { z } from "zod";

const searchQuerySchema = z.object({
  query: z.string(),
  page: z.number(),
  page_size: z.number(),
});
type SearchQuery = z.infer<typeof searchQuerySchema>;

interface SearchResult {
  token: string;
  score: number;
  item_type: string;
  item_id: string;
}

interface SearchResponse {
  results: SearchResult[];
  page: number;
  page_size: number;
  time_took: number;
}

export {
  type SearchQuery,
  searchQuerySchema,
  type SearchResponse,
  type SearchResult,
};
