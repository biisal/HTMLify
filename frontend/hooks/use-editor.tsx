"use client";

import React, { createContext, useContext, useState } from "react";

import useDebounce from "@/hooks/use-debounce";

export interface EditorContextType {
  html: string;
  setHtml: (v: string) => void;
  css: string;
  setCss: (v: string) => void;
  js: string;
  setJs: (v: string) => void;
  headContent: string;
  setHeadContent: (v: string) => void;
  bodyClasses: string;
  setBodyClasses: (v: string) => void;
  htmlLang: string;
  setHtmlLang: (v: string) => void;

  debouncedHtml: string;
  debouncedCss: string;
  debouncedJs: string;
  debouncedHead: string;
  debouncedBodyClasses: string;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [headContent, setHeadContent] = useState("");
  const [bodyClasses, setBodyClasses] = useState("");
  const [htmlLang, setHtmlLang] = useState("en");

  const debouncedHtml = useDebounce(html, 500);
  const debouncedCss = useDebounce(css, 500);
  const debouncedJs = useDebounce(js, 800);
  const debouncedHead = useDebounce(headContent, 500);
  const debouncedBodyClasses = useDebounce(bodyClasses, 500);

  return (
    <EditorContext.Provider
      value={{
        html,
        setHtml,
        css,
        setCss,
        js,
        setJs,
        headContent,
        setHeadContent,
        bodyClasses,
        setBodyClasses,
        htmlLang,
        setHtmlLang,
        debouncedHtml,
        debouncedCss,
        debouncedJs,
        debouncedHead,
        debouncedBodyClasses,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor must be used within EditorProvider");
  return context;
};
