import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

import { FileIcon as DynamicFileIcon } from "../dashboard/file-icon";

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
      <div className="flex items-center gap-3 p-2 relative border-b border-border/40 hover:bg-foreground/5"  >
        {!done && (
          <div
            style={{ width: `${progress}%` }}
            className="absolute h-full w-full left-0 top-0 bg-primary/15"
          ></div>
        )}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <DynamicFileIcon path={file.name} />
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
  );
}

function ListFiles() {
	const { queue, folder, } = useTmpFolderStore();

  if (!folder) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col ">
        {queue.toReversed().map((file) => (
          <FileItem key={file.id} file={file.file} progress={file.progress} />
        ))}
      </div>
    </div>
  );
}

export { ListFiles };
