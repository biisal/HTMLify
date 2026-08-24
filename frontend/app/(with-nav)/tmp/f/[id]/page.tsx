"use client";

import { use, useEffect, useState } from "react";

import { ListFiles } from "@/components/tmp/folder/file-list";
import { EmptyState, FileMetadata } from "@/components/tmp/folder/file-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { getTmpFolderFiles } from "@/lib/tmp-folder/tmp-folder.api";
import { TmpFolderFile } from "@/lib/tmp-folder/tmp-folder.types";

const TmpFolderPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const isMobile = useIsMobile();
  const [files, setFiles] = useState<TmpFolderFile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    getTmpFolderFiles(id).then(({ data, error }) => {
      setFiles(data);
      setError(error);
      if (data?.length === 1) setSelectedId(data[0].id);
    });
  }, [id]);

  if (error || (files && files.length === 0)) {
    return (
      <div className="font-mono p-4 h-full flex items-center justify-center text-muted-foreground">
        {error ? "tmp folder not found" : "this folder is empty"}
      </div>
    );
  }

  const selectedIndex = files?.findIndex((f) => f.id === selectedId) ?? -1;
  const selected = selectedIndex >= 0 ? files![selectedIndex] : null;

  return (
    <div className="h-full w-full bg-background text-foreground">
      <ResizablePanelGroup
        key={isMobile ? "vertical" : "horizontal"}
        orientation={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? 65 : 70}
          minSize={isMobile ? "45%" : "50%"}
        >
          {selected ? (
            <FileMetadata file={selected} index={selectedIndex} />
          ) : (
            <EmptyState />
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={isMobile ? 35 : 30}
          minSize={isMobile ? "30%" : "20%"}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center bg-foreground/15 px-3 py-2 border-b border-border font-mono text-xs">
              <span className="text-muted-foreground">
                {files ? files.length : "-"}
              </span>
              <span className="text-foreground">&nbsp;files</span>
            </div>
            <ListFiles
              files={files ?? []}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TmpFolderPage;
