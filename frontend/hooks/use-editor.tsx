"use client";

import React, { createContext, useContext, useState } from "react";

import useDebounce from "@/hooks/use-debounce";

const localSettingsKey = "userSettings";

interface UserChoosenSettings {
  disableHtmlSuggetion: boolean;
  disableCssSuggetion: boolean;
  disableJsSuggetion: boolean;
  htmlLang: string;
  headContent: string;
  bodyClasses: string;
}

const defaultSettings: UserChoosenSettings = {
  disableHtmlSuggetion: false,
  disableCssSuggetion: false,
  disableJsSuggetion: false,
  htmlLang: "en",
  headContent: "",
  bodyClasses: "",
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

  disableHtmlSuggetion: boolean;
  setDisableHtmlSuggetion: (v: boolean) => void;
  disableCssSuggetion: boolean;
  setDisableCssSuggetion: (v: boolean) => void;
  disableJsSuggetion: boolean;
  setDisableJsSuggetion: (v: boolean) => void;

  getLocalChoosenSettings: () => UserChoosenSettings;
  localSettingsKey: string;

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
  const setDisableHtmlSuggetion = (v: boolean) =>
    updateSetting("disableHtmlSuggetion", v);
  const setDisableCssSuggetion = (v: boolean) =>
    updateSetting("disableCssSuggetion", v);
  const setDisableJsSuggetion = (v: boolean) =>
    updateSetting("disableJsSuggetion", v);

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
    disableHtmlSuggetion,
    disableCssSuggetion,
    disableJsSuggetion,
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

        disableHtmlSuggetion,
        setDisableHtmlSuggetion,
        disableCssSuggetion,
        setDisableCssSuggetion,
        disableJsSuggetion,
        setDisableJsSuggetion,

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
