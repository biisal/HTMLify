"use client";
import { RawCodeEditor } from "@/components/playgroud/code-editor";

export const HTMLeditor = () => {
  return (
    <div>
      <RawCodeEditor
        language="html"
        onChange={() => {}}
        currentLanguage="html"
        code=""
      />
    </div>
  );
};
