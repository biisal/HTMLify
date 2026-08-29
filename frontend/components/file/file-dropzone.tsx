"use client";

import { AlertCircle, CloudUpload } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";

import { FileListItem } from "@/components/file/file-list-item";
import { cn, formatBytes } from "@/lib/utils";

interface FileDropzoneProps {
  value?: File | File[] | null;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  onChange?: (value: File | File[] | null) => void;
  className?: string;
}

export function FileDropzone({
  value,
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 1,
  onChange,
  className,
}: FileDropzoneProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  // Normalize value to array for consistent UI logic
  const files = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setLocalError(null);

      if (rejectedFiles.length > 0) {
        const firstErr = rejectedFiles[0].errors[0];
        setLocalError(`${rejectedFiles[0].file.name}: ${firstErr.message}`);
        return;
      }

      if (acceptedFiles.length > 0) {
        if (maxFiles === 1) {
          onChange?.(acceptedFiles[0]);
        } else {
          onChange?.(acceptedFiles.slice(0, maxFiles));
        }
      }
    },
    [maxFiles, onChange],
  );

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (maxFiles === 1) {
      onChange?.(null);
    } else {
      const next = files.filter((_, i) => i !== index);
      onChange?.(next.length > 0 ? next : null);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles,
    });

  const hasFiles = files.length > 0;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200",
          "border-muted-foreground/20 bg-muted/20 hover:border-primary/40 hover:bg-muted/30",
          isDragActive &&
            !isDragReject &&
            "border-primary bg-primary/5 scale-[1.01]",
          isDragReject && "border-destructive bg-destructive/5",
          hasFiles && !isDragActive && "border-primary/20 bg-primary/5",
        )}
      >
        <input {...getInputProps()} />

        {!hasFiles ? (
          <div className="flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted shadow-sm">
              <CloudUpload
                className={cn(
                  "h-6 w-6 text-muted-foreground",
                  isDragActive && "text-primary",
                )}
              />
            </div>
            <p className="text-sm font-medium text-foreground">
              {isDragReject
                ? "File not accepted"
                : isDragActive
                  ? "Drop here"
                  : "Click or drag files"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Up to {maxFiles} files (max {formatBytes(maxSize)})
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2">
            {files.map((file, i) => (
              <FileListItem
                key={i}
                name={file.name}
                size={file.size}
                progress={100}
                onRemove={(e) => removeFile(e, i)}
              />
            ))}
            {isDragActive && (
              <div className="mt-2 text-xs font-medium text-primary flex items-center justify-center gap-2">
                <CloudUpload className="h-4 w-4" /> Keep dropping to replace
              </div>
            )}
          </div>
        )}
      </div>

      {localError && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/5 px-3 py-2 text-xs text-destructive animate-in slide-in-from-top-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{localError}</span>
        </div>
      )}
    </div>
  );
}
