import { FileIcon } from "lucide-react";
import { BundledLanguage } from "shiki";

import {
  CodeBlockActions,
  CodeBlockContainer,
  CodeBlockContent,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ai-elements/code-block";
import { MediaViewer } from "@/components/media-viewer";
import { CodePlayground } from "@/components/playgroud/code-playground";
import { Button } from "@/components/ui/button";
import { getFileContentByPath } from "@/lib/modules/file/file.api";
import { getFileContentType } from "@/lib/modules/file/file.utils";
import { getLanguageByPath } from "@/lib/modules/playgournd/editor.utils";

type FileData =
  | {
      isMedia: true;
      url: string;
      fileType: "img" | "video" | "audio";
      contentType: string | null;
    }
  | { isMedia: false; code: string };

const StaticServe = async ({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) => {
  let { path } = await params;
  if (path[0] === "src") {
    path = path.slice(1);
  }
  const filename = `/${path.join("/")}`.replace(/^\/\//, "/");
  const language = getLanguageByPath(filename);

  if (filename.startsWith("/.well-known")) {
    return null;
  }

  const response = await getFileContentByPath(filename);
  if (!response) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center text-destructive">
        Failed to load file content or file not found.
      </div>
    );
  }

  const contentType = response.headers.get("content-type");
  const fileType = getFileContentType(filename, contentType);
  const isMedia =
    fileType === "img" || fileType === "video" || fileType === "audio";

  const fileData: FileData = isMedia
    ? { isMedia: true, url: response.url, fileType, contentType }
    : { isMedia: false, code: await response.text() };

  if (fileData.isMedia) {
    const { url, fileType, contentType } = fileData;
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <MediaViewer
          src={url}
          type={fileType}
          filename={filename}
          contentType={contentType}
        />
      </div>
    );
  }

  const { code } = fileData;
  return (
    <div className="flex flex-col max-h-[70vh]">
      <CodeBlockContainer language={language}>
        <CodeBlockHeader>
          <CodeBlockTitle className="w-full">
            <FileIcon size={14} />
            <CodeBlockFilename>{filename}</CodeBlockFilename>
          </CodeBlockTitle>
          <CodePlayground code={code} language={language}>
            <Button size="sm" className="h-8 text-xs">
              Run
            </Button>
          </CodePlayground>
          <CodeBlockActions />
        </CodeBlockHeader>
        <div className="overflow-auto max-h-[70vh] min-h-0">
          <CodeBlockContent
            code={code}
            showLineNumbers
            language={language as BundledLanguage}
          />
        </div>
      </CodeBlockContainer>
    </div>
  );
};

export default StaticServe;
