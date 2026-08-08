import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { env } from "@/lib/env";
import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

function FileItem({ file, progress }: { file: File; progress: number }) {
  const done = progress >= 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 bg-muted-foreground/10 py-3 px-2 rounded-lg">
        <span className="truncate text-sm font-bold text-foreground/80">
          {file.name}
        </span>
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
    <div className="h-full w-md p-2 bg-muted-foreground/5 rounded-lg flex flex-col">
      <div className="flex items-center gap-1 mb-4">
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
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          {queue.toReversed().map((file) => (
            <FileItem key={file.id} file={file.file} progress={file.progress} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export { ListFiles };
