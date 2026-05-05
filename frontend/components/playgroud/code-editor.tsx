"use client";

import { Editor, type OnChange as OnMonacoChange } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

import type { CodeEditorProps } from "@/lib/modules/playgournd/editor.types";
import {
  getLanguageByPath,
  LANGUAGE_GROUPS,
} from "@/lib/modules/playgournd/editor.utils";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface RawCodeEditorProps
  extends CodeEditorProps, Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
  diff?: boolean;
  originalCode?: string;
}

export const RawCodeEditor = ({
  code,
  onChange,
  language,
  showSuggestion,
  fontSize,
  tabSize,
  insertSpaces,
  ...props
}: RawCodeEditorProps) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "vs-dark";
  return (
    <Editor
      className={props.className}
      theme={theme}
      height="100%"
      value={code}
      onChange={onChange as OnMonacoChange}
      options={{
        quickSuggestions: !!showSuggestion,
        suggestOnTriggerCharacters: !!showSuggestion,
        autoIndent: "full",
        minimap: { enabled: false },
        "semanticHighlighting.enabled": true,
        fontSize: fontSize || 14,
        tabSize: tabSize || 2,
        insertSpaces: insertSpaces !== undefined ? insertSpaces : true,

        scrollBeyondLastLine: false,
        wordWrap: "on",
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        formatOnPaste: true,
      }}
      language={language}
    />
  );
};

export interface EditorHeaderProps {
  path?: string;
  onLanguageChange: (language: string) => void;
  currentLanguage?: string;
}

export function EditorHeader({
  path,
  onLanguageChange,
  currentLanguage,
}: EditorHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 bg-muted/60",
        "border-b border-border/50 backdrop-blur-sm shrink-0",
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5 mr-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>

        {/* Path breadcrumbs */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono min-w-0">
          {path?.split("/").map((segment, i, arr) => (
            <span key={i} className="flex items-center gap-1 min-w-0">
              {i > 0 && <span className="text-border shrink-0">/</span>}
              <span
                className={
                  i === arr.length - 1
                    ? "text-foreground/80 font-medium truncate"
                    : "truncate"
                }
              >
                {segment}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Language badge */}
      <LangugesMenu
        onChange={onLanguageChange}
        defaultValue={currentLanguage}
      />
    </div>
  );
}

export default function CodeEditor({
  code,
  language,
  onChange,
  diff,
  originalCode,
  path,
}: CodeEditorProps & {
  diff?: boolean;
  originalCode?: string;
  path?: string;
}) {
  const [currentLanguage, setCurrentLanguage] = useState(
    language || getLanguageByPath(path || "") || "plain",
  );

  return (
    <div className="h-[70vh] my-4 rounded-xl border border-border/60 overflow-hidden shadow-sm flex flex-col min-w-0">
      <EditorHeader
        path={path}
        onLanguageChange={setCurrentLanguage}
        currentLanguage={currentLanguage}
      />

      <RawCodeEditor
        code={code}
        onChange={onChange}
        diff={diff}
        originalCode={originalCode}
        language={currentLanguage}
      />
    </div>
  );
}

const LangugesMenu = ({
  onChange,
  defaultValue,
}: {
  onChange: (language: string) => void;
  defaultValue?: string;
}) => {
  return (
    <Select onValueChange={(value) => onChange(value)} value={defaultValue}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_GROUPS.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
