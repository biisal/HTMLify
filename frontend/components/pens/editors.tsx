"use client";

import { useEffect, useRef, useState } from "react";

import { CSS, HTML, JavaScript } from "@/components/icons";
import { Loader } from "@/components/loader";
import { RawCodeEditor } from "@/components/playgroud/code-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useDebounce from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";

const languages = {
  html: { label: "HTML", Icon: HTML },
  css: { label: "CSS", Icon: CSS },
  javascript: { label: "JavaScript", Icon: JavaScript },
};

type Language = keyof typeof languages;

const EditorWithHeader = ({
  language,
  code,
  onChange,
  hideHeader = false,
}: {
  language: Language;
  code: string;
  onChange: (code: string) => void;
  hideHeader?: boolean;
}) => {
  const { Icon, label } = languages[language];

  return (
    <div className="h-full flex flex-col">
      {!hideHeader && (
        <header className="sticky top-0 flex items-center gap-2 border-b border-border bg-background/80 p-3 backdrop-blur-xl">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide">{label}</span>
        </header>
      )}
      <div className="flex-1 overflow-hidden">
        <RawCodeEditor
          className="h-full z-0"
          language={language}
          onChange={onChange}
          code={code}
        />
      </div>
    </div>
  );
};

const EditorTags = ({
  active,
  onTabChange,
}: {
  active: Language;
  onTabChange: (lang: Language) => void;
}) => {
  return (
    <div className="flex items-center gap-1 border-b border-border bg-background p-1.5">
      {Object.entries(languages).map(([lang, { label, Icon }]) => (
        <button
          key={lang}
          onClick={() => onTabChange(lang as Language)}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1.5 transition-all duration-200 flex-1 ${
            lang === active
              ? "bg-secondary text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary/50"
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="text-xs font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};

interface EditorGroupProps {
  html: string;
  setHtml: (val: string) => void;
  css: string;
  setCss: (val: string) => void;
  js: string;
  setJs: (val: string) => void;
}

const DesktopEditors = ({
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
}: EditorGroupProps) => (
  <ResizablePanelGroup orientation="horizontal">
    <ResizablePanel defaultSize={50} minSize={60}>
      <EditorWithHeader language="html" code={html} onChange={setHtml} />
    </ResizablePanel>
    <ResizableHandle withHandle className="bg-border/50" />
    <ResizablePanel defaultSize={50}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={50} minSize={50}>
          <EditorWithHeader language="css" code={css} onChange={setCss} />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border/50" />
        <ResizablePanel defaultSize={50} minSize={50}>
          <EditorWithHeader language="javascript" code={js} onChange={setJs} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
);

const MobileEditors = ({
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  activeTab,
  setActiveTab,
}: EditorGroupProps & {
  activeTab: Language;
  setActiveTab: (lang: Language) => void;
}) => {
  const renderEditor = (lang: Language) => {
    switch (lang) {
      case "html":
        return (
          <EditorWithHeader
            language="html"
            code={html}
            onChange={setHtml}
            hideHeader
          />
        );
      case "css":
        return (
          <EditorWithHeader
            language="css"
            code={css}
            onChange={setCss}
            hideHeader
          />
        );
      case "javascript":
        return (
          <EditorWithHeader
            language="javascript"
            code={js}
            onChange={setJs}
            hideHeader
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <EditorTags active={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 min-h-0 relative">{renderEditor(activeTab)}</div>
    </div>
  );
};

export const PenEditor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [mount, setMount] = useState(false);
  const [activeTab, setActiveTab] = useState<Language>("html");

  const isMobile = useIsMobile();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.srcdoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
  }, [html, css, js]);

  const debouncedHtml = useDebounce(html, 500);
  const debouncedCss = useDebounce(css, 500);
  const debouncedJs = useDebounce(js, 500);

  useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 1000);
  }, []);

  if (!mount) return <Loader />;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <ResizablePanelGroup
        orientation="vertical"
        className="rounded-lg border border-border"
      >
        <ResizablePanel defaultSize={70} className="flex flex-col min-h-0">
          {isMobile ? (
            <MobileEditors
              html={html}
              setHtml={setHtml}
              css={css}
              setCss={setCss}
              js={js}
              setJs={setJs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <DesktopEditors
              html={html}
              setHtml={setHtml}
              css={css}
              setCss={setCss}
              js={js}
              setJs={setJs}
            />
          )}
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-border/50" />

        <ResizablePanel defaultSize={30} maxSize={"60%"} minSize={50}>
          <iframe
            srcDoc={`
                <html lang="en">
                  <head>
                    <style>${debouncedCss}</style>
                  </head>
                  <body>
                    ${debouncedHtml}
                    <script>${debouncedJs}</script>
                  </body>
                </html>
              `}
            className="w-full h-full bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
