import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { DeleteAlertDialog } from "@/components/dashboard/delete-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFile } from "@/lib/modules/file/file.api";
import { FileItem, FolderItem } from "@/lib/modules/file/file.types";

export function DashboardAction({
  isFolder,
  href,
  file,
}: {
  isFolder: boolean;
  href: string;
  file: FileItem | FolderItem;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem>
            {isFolder ? (
              <Link href={href} className="w-full">
                Open
              </Link>
            ) : (
              <a
                href={href}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            )}
          </DropdownMenuItem>
          {file && "id" in file && (
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/file/edit/${file.id}`}
                className="w-full cursor-pointer"
              >
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            {file && "id" in file && (
              <DeleteAlertDialog
                title="Delete file"
                description={`Are you sure you want to delete ${file.path}?`}
                successMessage="File deleted successfully"
                onConfirm={async () => {
                  const { error } = await deleteFile(file.id);
                  if (error) {
                    toast.error(error);
                    return false;
                  }
                  return true;
                }}
              />
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
