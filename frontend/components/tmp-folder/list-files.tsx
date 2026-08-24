import { FileListItem } from "@/components/file/file-list-item";
import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";

function ListFiles() {
  const { queue, folder } = useTmpFolderStore();

  if (!folder) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col">
        {queue.toReversed().map((item) => (
          <FileListItem
            key={item.id}
            name={item.file.name}
            size={item.file.size}
            progress={item.progress}
          />
        ))}
      </div>
    </div>
  );
}

export { ListFiles };
