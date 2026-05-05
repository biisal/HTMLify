"use client";

import React, { createContext, useContext, useState } from "react";

import useDebounce from "@/hooks/use-debounce";
import { UserChoosenSettings } from "@/lib/modules/playgournd/editor.types";

const localSettingsKey = "userSettings";

const defaultSettings: UserChoosenSettings = {
  enableHtmlSuggestion: true,
  enableCssSuggestion: true,
  enableJsSuggestion: true,
  htmlLang: "en",
  headContent: "",
  bodyClasses: "",
  htmlFontSize: 14,
  htmlTabSize: 2,
  htmlInsertSpaces: true,
  cssFontSize: 14,
  cssTabSize: 2,
  cssInsertSpaces: true,
  jsFontSize: 14,
  jsTabSize: 2,
  jsInsertSpaces: true,
};
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

  enableHtmlSuggestion: boolean;
  setEnableHtmlSuggestion: (v: boolean) => void;
  enableCssSuggestion: boolean;
  setEnableCssSuggestion: (v: boolean) => void;
  enableJsSuggestion: boolean;
  setEnableJsSuggestion: (v: boolean) => void;

  getLocalChoosenSettings: () => UserChoosenSettings;
  localSettingsKey: string;

  htmlFontSize: number;
  setHtmlFontSize: (v: number) => void;
  htmlTabSize: number;
  setHtmlTabSize: (v: number) => void;
  htmlInsertSpaces: boolean;
  setHtmlInsertSpaces: (v: boolean) => void;

  cssFontSize: number;
  setCssFontSize: (v: number) => void;
  cssTabSize: number;
  setCssTabSize: (v: number) => void;
  cssInsertSpaces: boolean;
  setCssInsertSpaces: (v: boolean) => void;

  jsFontSize: number;
  setJsFontSize: (v: number) => void;
  jsTabSize: number;
  setJsTabSize: (v: number) => void;
  jsInsertSpaces: boolean;
  setJsInsertSpaces: (v: boolean) => void;

  debouncedHtml: string;
  debouncedCss: string;
  debouncedJs: string;
  debouncedHead: string;
  debouncedBodyClasses: string;
}

const EditorContext = createContext<EditorContextType | null>(null);

function getLocalChoosenSettings() {
  if (typeof window === "undefined") {
    return defaultSettings;
  }
  const settings = localStorage.getItem(localSettingsKey);
  if (settings) {
    try {
      return JSON.parse(settings) as UserChoosenSettings;
    } catch {}
  }
  return defaultSettings;
}

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [settings, setSettings] = useState<UserChoosenSettings>(() =>
    getLocalChoosenSettings(),
  );

  const updateSetting = <K extends keyof UserChoosenSettings>(
    key: K,
    value: UserChoosenSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const setHtmlLang = (v: string) => updateSetting("htmlLang", v);
  const setHeadContent = (v: string) => updateSetting("headContent", v);
  const setBodyClasses = (v: string) => updateSetting("bodyClasses", v);
  const setEnableHtmlSuggestion = (v: boolean) =>
    updateSetting("enableHtmlSuggestion", v);
  const setEnableCssSuggestion = (v: boolean) =>
    updateSetting("enableCssSuggestion", v);
  const setEnableJsSuggestion = (v: boolean) =>
    updateSetting("enableJsSuggestion", v);

  const setHtmlFontSize = (v: number) => updateSetting("htmlFontSize", v);
  const setHtmlTabSize = (v: number) => updateSetting("htmlTabSize", v);
  const setHtmlInsertSpaces = (v: boolean) =>
    updateSetting("htmlInsertSpaces", v);

  const setCssFontSize = (v: number) => updateSetting("cssFontSize", v);
  const setCssTabSize = (v: number) => updateSetting("cssTabSize", v);
  const setCssInsertSpaces = (v: boolean) =>
    updateSetting("cssInsertSpaces", v);

  const setJsFontSize = (v: number) => updateSetting("jsFontSize", v);
  const setJsTabSize = (v: number) => updateSetting("jsTabSize", v);
  const setJsInsertSpaces = (v: boolean) => updateSetting("jsInsertSpaces", v);

  const debouncedSettings = useDebounce(settings, 1000);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localSettingsKey, JSON.stringify(debouncedSettings));
    }
  }, [debouncedSettings]);

  const {
    htmlLang,
    headContent,
    bodyClasses,
    enableHtmlSuggestion,
    enableCssSuggestion,
    enableJsSuggestion,
    htmlFontSize,
    htmlTabSize,
    htmlInsertSpaces,
    cssFontSize,
    cssTabSize,
    cssInsertSpaces,
    jsFontSize,
    jsTabSize,
    jsInsertSpaces,
  } = settings;

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

        getLocalChoosenSettings,
        localSettingsKey,

        enableHtmlSuggestion,
        setEnableHtmlSuggestion,
        enableCssSuggestion,
        setEnableCssSuggestion,
        enableJsSuggestion,
        setEnableJsSuggestion,

        htmlFontSize,
        setHtmlFontSize,
        htmlTabSize,
        setHtmlTabSize,
        htmlInsertSpaces,
        setHtmlInsertSpaces,

        cssFontSize,
        setCssFontSize,
        cssTabSize,
        setCssTabSize,
        cssInsertSpaces,
        setCssInsertSpaces,

        jsFontSize,
        setJsFontSize,
        jsTabSize,
        setJsTabSize,
        jsInsertSpaces,
        setJsInsertSpaces,

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
