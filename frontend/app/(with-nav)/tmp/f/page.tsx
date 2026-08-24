import TmpFolderForm from "@/components/tmp-folder/tmp-folder-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TempFolderPage = () => {
  return (
    <div className="w-full px-8 pt-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-start space-y-2">
          <h1 className="text-3xl md:text-4xl font-mono tracking-tight">
            Temporary Folder Links
          </h1>
          <p className="text-muted-foreground text-lg">
            Create a folder, upload files, and share them with a single link.
          </p>
        </div>

        <Card className="border-border/50 shadow-xl bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Files you drop are uploaded automatically and share the same
              folder link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TmpFolderForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TempFolderPage;
