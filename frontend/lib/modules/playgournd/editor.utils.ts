import type { SupportedLanguage } from "@/lib/modules/playgournd/editor.types";

export function getLanguageByPath(path: string): SupportedLanguage {
  const ext = path.toLowerCase().split(".").pop();

  switch (ext) {
    case "js":
      return "js";
    case "jsx":
      return "jsx";
    case "ts":
      return "ts";
    case "tsx":
      return "tsx";
    case "py":
      return "py";
    case "html":
      return "html";
    case "xml":
      return "xml";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "md";
    case "markdown":
      return "markdown";
    default:
      return "plain";
  }
}
const LANGUAGE_GROUPS = [
  {
    label: "Web",
    languages: [
      { value: "html", label: "HTML" },
      { value: "css", label: "CSS" },
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "jsx", label: "JSX" },
      { value: "tsx", label: "TSX" },
    ],
  },
  {
    label: "Backend",
    languages: [{ value: "python", label: "Python" }],
  },
  {
    label: "Config & Markup",
    languages: [
      { value: "json", label: "JSON" },
      { value: "xml", label: "XML" },
      { value: "markdown", label: "Markdown" },
    ],
  },
  {
    label: "Other",
    languages: [{ value: "text", label: "Plain Text" }],
  },
] as const;

export { LANGUAGE_GROUPS };
