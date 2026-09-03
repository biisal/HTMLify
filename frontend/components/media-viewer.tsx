"use client";

import {
  Check,
  Copy,
  Download,
  FileAudio as FileAudioIcon,
  Share2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  copyToClipboard,
  downloadFile,
  shareContent,
} from "@/lib/utils/actions";

import { FileIcon } from "./dashboard/file-icon";

type MediaType = "img" | "video" | "audio";

interface MediaViewerProps {
  src: string;
  type: MediaType;
  filename?: string;
  contentType?: string | null;
}

export function MediaViewer({
  src,
  type,
  filename,
  contentType,
}: MediaViewerProps) {
  const mimeLabel = contentType?.split(";")[0];
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(src, {
      successMessage: "URL copied to clipboard",
      errorMessage: "Failed to copy URL",
    });
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile(src, filename);
  };

  const handleShare = () => {
    shareContent({
      title: filename || "Shared file",
      url: src,
      fallbackCopy: true,
    });
  };

  return (
    <Card className="bg-muted/20 gap-0 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MediaIcon type={type} />
          <h1 className="text-muted-foreground">{filename ?? src}</h1>
          {mimeLabel && (
            <span className="ml-auto shrink-0 text-muted-foreground/60">
              {mimeLabel}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex min-w-lg items-center justify-center p-4">
          {type === "img" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={filename ?? ""}
              className="max-w-full max-h-[60vh] object-contain"
            />
          )}

          {type === "video" && (
            <video
              src={src}
              controls
              className="max-w-full max-h-[60vh] rounded-sm"
            >
              {contentType && <source src={src} type={contentType} />}
            </video>
          )}

          {type === "audio" && (
            <div className="flex flex-col items-center gap-4 py-8 w-full max-w-sm">
              <div className="flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground">
                <FileAudioIcon size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xs text-muted-foreground font-mono truncate max-w-full">
                {filename ?? src}
              </span>
              <audio src={src} controls className="w-full">
                {contentType && <source src={src} type={contentType} />}
              </audio>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-1  px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyUrl}
            className="gap-1.5 text-muted-foreground"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Copy URL"}
            </span>
          </Button>

          <Separator orientation="vertical" className="h-5" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-muted-foreground"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>

          <Separator orientation="vertical" className="h-5" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-muted-foreground"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MediaIcon({ type }: { type: MediaType }) {
  let path: string = type;
  switch (type) {
    case "video":
      path = ".mp4";
      break;
    case "audio":
      path = ".mp3";
      break;
    default:
      path = ".jpg";
      break;
  }
  return <FileIcon path={path} />;
}
