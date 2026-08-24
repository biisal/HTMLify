import { FileIcon } from "@/components/dashboard/file-icon";
import { formatBytes } from "@/lib/utils";

interface FileListItemProps {
  name: string;
  size: number;
  progress: number;
}


export function FileListItem({ name, size, progress }: FileListItemProps) {
  const done = progress >= 100;

  return (
    <div className="flex items-center gap-3 p-2 relative border-b border-border/40 hover:bg-foreground/5">
      {!done && (
        <div
          style={{ width: `${progress}%` }}
          className="absolute h-full w-full left-0 top-0 bg-primary/15"
        />
      )}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <FileIcon path={name} />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{formatBytes(size)}</p>
      </div>
      {!done && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {progress}%
        </span>
      )}
    </div>
  );
}