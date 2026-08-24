"use client";

import { File as FileIcon, X } from "lucide-react";

import { DropzoneArea } from "@/components/file/dropzone-area";
import { TmpResult } from "@/components/tmp/tmp-result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatBytes } from "@/lib/utils";

import { useTmpForm } from "@/lib/hooks/use-tmp-form";

export const TmpForm = () => {
  const {
    file,
    name,
    expiry,
    customExpiry,
    customUnit,
    error,
    result,
    isPending,
    isCustom,
    expiryOptions,
    setFile,
    setName,
    setExpiry,
    setCustomExpiry,
    setCustomUnit,
    handleSubmit,
  } = useTmpForm();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
            Select File
          </Label>
          {file ? (
            <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <FileIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <DropzoneArea
              maxFiles={1}
              onDrop={(files) => setFile(files[0] ?? null)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tmp-name" className="text-xs text-muted-foreground">
              Custom Name (Optional)
            </Label>
            <Input
              id="tmp-name"
              placeholder="e.g. my-awesome-file"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="tmp-expiry"
                className="text-xs text-muted-foreground"
              >
                Expiry Time
              </Label>
              <Select value={expiry} onValueChange={setExpiry}>
                <SelectTrigger id="tmp-expiry">
                  <SelectValue placeholder="Select expiry" />
                </SelectTrigger>
                <SelectContent>
                  {expiryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isCustom && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Custom Duration
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={customExpiry}
                    onChange={(e) => setCustomExpiry(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
                <div className="w-1/3 space-y-2">
                  <Label className="text-xs text-muted-foreground">Unit</Label>
                  <Select value={customUnit} onValueChange={setCustomUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Seconds</SelectItem>
                      <SelectItem value="60">Minutes</SelectItem>
                      <SelectItem value="3600">Hours</SelectItem>
                      <SelectItem value="86400">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full md:w-auto"
          disabled={isPending || !file}
        >
          {isPending ? "Generating..." : "Generate Link"}
        </Button>
      </div>

      {error && (
        <p className="text-destructive text-sm bg-destructive/10 p-2 w-fit rounded-md">
          {error}
        </p>
      )}

      {result && <TmpResult result={result} className="mt-8" />}
    </div>
  );
};
