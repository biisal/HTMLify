export type SupportedLanguage =
  | "javascript"
  | "js"
  | "jsx"
  | "typescript"
  | "ts"
  | "tsx"
  | "python"
  | "py"
  | "html"
  | "xml"
  | "css"
  | "json"
  | "markdown"
  | "md"
  | "plain";

export interface CodeEditorProps {
  code: string;
  language: string;
  showSuggestion?: boolean;
  fontSize?: number;
  tabSize?: number;
  insertSpaces?: boolean;
  onChange: (code: string) => void;
}

export interface UserChoosenSettings {
  enableHtmlSuggestion: boolean;
  enableCssSuggestion: boolean;
  enableJsSuggestion: boolean;
  htmlLang: string;
  headContent: string;
  bodyClasses: string;
  htmlFontSize: number;
  htmlTabSize: number;
  htmlInsertSpaces: boolean;
  cssFontSize: number;
  cssTabSize: number;
  cssInsertSpaces: boolean;
  jsFontSize: number;
  jsTabSize: number;
  jsInsertSpaces: boolean;
}

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
