import { useTmpFolderStore } from "@/lib/hooks/use-tmp-folder";
import { useDropzone } from "react-dropzone";

function FileUpload({ folderName }: { folderName: string }) {
  const { addFiles } = useTmpFolderStore();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => addFiles(files),
  });

  if (!folderName) return null;
  return (
    <section className="w-full h-full bg-red-400 flex items-center justify-center">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside></aside>
    </section>
  );
}

export { FileUpload };
