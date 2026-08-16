import { Check, Copy, ExternalLink, File as FileIcon } from "lucide-react";
import { useState } from "react";

import { env } from "@/lib/env";
import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function FileItem({ file, progress }: { file: File; progress: number }) {
  const done = progress >= 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3 rounded-lg relative border bg-background px-3 py-2 shadow-sm">
        {!done && (
          <div
            style={{ width: `${progress}%` }}
            className="absolute h-full w-full left-0 top-0 bg-primary/15"
          ></div>
        )}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <FileIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(file.size)}
          </p>
        </div>
        {!done && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
}

function ListFiles() {
  const { queue, folder } = useTmpFolderStore();
  const [copied, setCopied] = useState(false);

  if (!folder) {
    return null;
  }
  const url = `${env.NEXT_PUBLIC_SITE_URL}/tmp/f/${folder.id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <p className="min-w-0 flex-1 select-all truncate font-mono text-xs text-muted-foreground">
          {url}
        </p>
        <button
          type="button"
          onClick={copyUrl}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title={copied ? "Copied!" : "Copy URL"}
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={() => window.open(url, "_blank")}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Open URL"
        >
          <ExternalLink className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {queue.toReversed().map((file) => (
          <FileItem
            key={file.id}
            file={file.file}
            progress={file.progress}
          />
        ))}
      </div>
    </div>
  );
}

export { ListFiles };
