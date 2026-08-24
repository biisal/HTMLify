"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, File as FileIcon, Folder, Lock, X } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { AlertDialog } from "@/components/alert-dialog";
import { DropzoneArea } from "@/components/file/dropzone-area";
import { FilePreview } from "@/components/file/file-preview";
import { ModeSelect, VisibilitySelect } from "@/components/file/select-fields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { env } from "@/lib/env";
import { updateFile, uploadFile } from "@/lib/modules/file/file.api";
import { fileFormSchema, FileFormType } from "@/lib/modules/file/file.schema";
import { FileType } from "@/lib/modules/file/file.types";
import {
  getFileContentType,
  hasFileExtention,
} from "@/lib/modules/file/file.utils";
import { UserFullInfo } from "@/lib/modules/user/user.types";
import { formatBytes, zodToFormData } from "@/lib/utils";

type InputFieldConfig = {
  name: keyof FileFormType;
  label: string;
  description?: string;
  placeholder: string;
  icon: ReactNode;
  type?: string;
};

interface InitialDataProps {
  id: number;
  title: string;
  path: string;
  password: string | null;
  mode: "source" | "render";
  visibility: string;
  content?: string | null;
  mediaUrl: string | null;
  fileType: FileType;
}

type FileFormProps =
  | {
      mode: "update";
      initialData: InitialDataProps;
      user: UserFullInfo;
    }
  | {
      mode: "upload";
      initialData?: never;
      user: UserFullInfo;
    };

export const FileForm = ({
  user,
  initialData,
  mode = "upload",
}: FileFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const modeText = mode.charAt(0).toUpperCase() + mode.slice(1);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [currentFileType, setCurrentFileType] = useState<FileType>(
    initialData?.fileType || "other",
  );
  const [mediaUrl, setMediaUrl] = useState<string | null>(
    initialData?.mediaUrl || null,
  );

  const form = useForm<FileFormType>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      content: initialData?.content || "",
      title: initialData?.title || "",
      password: initialData?.password || "",
      file: undefined,
      path: initialData?.path || `/${user.username}/`,
      mode: initialData?.mode || "source",
      visibility: initialData?.visibility || "public",
    },
  });

  const inputFields: InputFieldConfig[] = [
    {
      name: "title",
      label: "Title",
      placeholder: "enter the title of ur file",
      icon: <FileIcon />,
    },
    {
      name: "path",
      label: "Path",
      description: `make sure the path starts with /${user.username}/`,
      placeholder: "enter the file path",
      icon: <Folder />,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "password (optional)",
      icon: <Lock />,
      type: "password",
    },
  ];

  const content = useWatch({ control: form.control, name: "content" });

  const onSubmit = async (
    data: z.infer<typeof fileFormSchema>,
    force = false,
  ) => {
    if (currentFileType === "other") {
      data = {
        ...data,
        file: undefined,
      };
    }

    if (!force && !hasFileExtention(data.path)) {
      setAlertDialogOpen(true);
      return;
    }

    setIsPending(true);
    const formData = zodToFormData(data);
    const { error } =
      mode === "upload" || initialData?.id === undefined
        ? await uploadFile(formData)
        : await updateFile(initialData.id, formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success(
        `File ${mode === "update" ? "updated" : "uploaded"} successfully`,
      );

      if (mode === "upload") {
        form.reset();
        setCurrentFileType("other");
        setMediaUrl(null);
      }
    }
    setIsPending(false);
  };

  const handleFileChange = (
    value: File | File[] | null,
    field: ControllerRenderProps<FileFormType, "file">,
  ) => {
    if (!value) setCurrentFileType("other");
    field.onChange(value);
    const file = Array.isArray(value) ? value[0] : value;
    if (file instanceof File) {
      const type = getFileContentType(file.name, file.type);
      setCurrentFileType(type);
      if (type === "other") {
        setMediaUrl("");
        const reader = new FileReader();
        reader.onload = (e) => {
          form.setValue("content", e.target?.result as string);
        };
        reader.readAsText(file);
        return;
      }
      form.setValue("content", "");
      setMediaUrl(URL.createObjectURL(file));
    }
  };
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>{modeText} File</CardTitle>
      </CardHeader>
      <CardContent>
        <FilePreview
          mediaUrl={mediaUrl}
          fileType={currentFileType}
          path={initialData?.path || ""}
          code={content}
          onChange={(code) => form.setValue("content", code)}
        />
        <AlertDialog
          title="No file extension"
          description="You are saving a file without any extension. The file may not open correctly without one."
          open={alertDialogOpen}
          setOpen={setAlertDialogOpen}
          onConfirm={() => onSubmit(form.getValues(), true)}
        />
        <form onSubmit={form.handleSubmit((value) => onSubmit(value, false))}>
          <FieldGroup>
            <div className="w-full grid gap-4 md:grid-cols-2 grid-cols-1">
              {inputFields.map(
                ({ name, label, description, placeholder, icon, type }) => (
                  <Controller
                    key={name}
                    name={name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>{label}</FieldLabel>
                        {description && (
                          <FieldDescription>{description}</FieldDescription>
                        )}
                        <InputGroup className="h-11">
                          <InputGroupAddon>{icon}</InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            value={field.value as string}
                            type={
                              name === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : (type ?? "text")
                            }
                            placeholder={placeholder}
                          />
                          {name === "password" && (
                            <InputGroupButton
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                          )}
                        </InputGroup>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                ),
              )}
              <VisibilitySelect control={form.control} name="visibility" />
              <ModeSelect control={form.control} name="mode" />
            </div>

            <Controller
              name="file"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>File</FieldLabel>
                  {field.value ? (
                    <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <FileIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium">
                          {field.value.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(field.value.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleFileChange(null, field)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <DropzoneArea
                      maxFiles={1}
                      maxSize={
                        env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB * 1024 * 1024
                      }
                      onDrop={(files) =>
                        handleFileChange(files[0] ?? null, field)
                      }
                    />
                  )}
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex items-center justify-center mt-2 gap-4 w-fit">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
