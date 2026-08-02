interface PenResponse {
  id: string;
  user: string;
  title: string;
  head_blob_hash: string;
  body_blob_hash: string;
  css_blob_hash: string;
  js_blob_hash: string;
  views: number;
  modified: string;
  head_content: string;
  body_content: string;
  css_content: string;
  js_content: string;
}

interface Pen {
  title: string;
  id: string;
}

export type { Pen, PenResponse };
