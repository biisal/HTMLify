"use client";

import { TmpFolderFile } from "@/lib/tmp-folder/tmp-folder.types";
import { formatExpiryDelta } from "./utils";

export function ListFiles({
  files,
  selectedId,
  onSelect,
}: {
  files: TmpFolderFile[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="font-mono text-sm flex-1 overflow-y-auto">
      {files.map((file) => {
        const active = file.id === selectedId;
        return (
          <button
            key={file.id}
            onClick={() => onSelect(file.id)}
            className={`block w-full text-left px-3 py-2.5 border-l-2 transition-colors ${
              active
                ? "border-primary bg-primary/10 text-foreground"
                : "border-transparent hover:bg-muted hover:border-foreground/20 text-muted-foreground"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-[11px] text-muted-foreground/70">
                {formatExpiryDelta(file.expiry)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}