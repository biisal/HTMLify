import { Code2, Globe, Layout, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { RawCodeEditor } from "@/components/playgroud/code-editor";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEditor } from "@/hooks/use-editor";

interface EditorSettingsDrawerProps {
  activeLanguage: "html" | "css" | "javascript";
}

function AutoCompleteSwitch({
  enableAutoComplete,
  setEnableAutoComplete,
  language,
}: {
  enableAutoComplete: boolean;
  setEnableAutoComplete: (v: boolean) => void;
  language: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={"enable-auto-complete-" + language}
        checked={enableAutoComplete}
        onCheckedChange={setEnableAutoComplete}
      />
      <Label htmlFor={"enable-auto-complete-" + language}>
        Auto Complete for {language}
      </Label>
    </div>
  );
}

interface LanguageSettings {
  fontSize: number;
  setFontSize: (v: number) => void;
  tabSize: number;
  setTabSize: (v: number) => void;
  insertSpaces: boolean;
  setInsertSpaces: (v: boolean) => void;
}

const EditorPreferences = ({ language }: { language: string }) => {
  const editor = useEditor();

  const settingsMap: Record<string, LanguageSettings> = {
    html: {
      fontSize: editor.htmlFontSize,
      setFontSize: editor.setHtmlFontSize,
      tabSize: editor.htmlTabSize,
      setTabSize: editor.setHtmlTabSize,
      insertSpaces: editor.htmlInsertSpaces,
      setInsertSpaces: editor.setHtmlInsertSpaces,
    },
    css: {
      fontSize: editor.cssFontSize,
      setFontSize: editor.setCssFontSize,
      tabSize: editor.cssTabSize,
      setTabSize: editor.setCssTabSize,
      insertSpaces: editor.cssInsertSpaces,
      setInsertSpaces: editor.setCssInsertSpaces,
    },
    javascript: {
      fontSize: editor.jsFontSize,
      setFontSize: editor.setJsFontSize,
      tabSize: editor.jsTabSize,
      setTabSize: editor.setJsTabSize,
      insertSpaces: editor.jsInsertSpaces,
      setInsertSpaces: editor.setJsInsertSpaces,
    },
  };

  const current = settingsMap[language] || settingsMap.html;

  return (
    <section className="space-y-4 pt-4 border-t border-border/50">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
        <span>Editor Preferences ({language.toUpperCase()})</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Font Size</Label>
          <Input
            type="number"
            value={current.fontSize}
            onChange={(e) => current.setFontSize(Number(e.target.value))}
            min={8}
            max={32}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Tab Size</Label>
          <Input
            type="number"
            value={current.tabSize}
            onChange={(e) => current.setTabSize(Number(e.target.value))}
            min={1}
            max={8}
            className="h-8"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id={"insert-spaces-" + language}
          checked={current.insertSpaces}
          onCheckedChange={current.setInsertSpaces}
        />
        <Label htmlFor={"insert-spaces-" + language} className="text-xs">
          Insert spaces instead of tabs
        </Label>
      </div>
    </section>
  );
};

const HTMLSettings = () => {
  const {
    headContent,
    setHeadContent,
    bodyClasses,
    setBodyClasses,
    htmlLang,
    setHtmlLang,
    enableHtmlSuggestion,
    setEnableHtmlSuggestion,
  } = useEditor();

  return (
    <div className="flex flex-col gap-8 py-4">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
          <span>Document Settings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="html-lang"
              className="text-xs text-muted-foreground"
            >
              HTML Language
            </Label>
            <Select value={htmlLang} onValueChange={setHtmlLang}>
              <SelectTrigger id="html-lang" className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (en)</SelectItem>
                <SelectItem value="es">Spanish (es)</SelectItem>
                <SelectItem value="fr">French (fr)</SelectItem>
                <SelectItem value="de">German (de)</SelectItem>
                <SelectItem value="ja">Japanese (ja)</SelectItem>
                <SelectItem value="zh">Chinese (zh)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="body-classes"
              className="text-xs text-muted-foreground"
            >
              Body Classes
            </Label>
            <Input
              id="body-classes"
              placeholder="e.g. dark bg-slate-900"
              value={bodyClasses}
              onChange={(e) => setBodyClasses(e.target.value)}
              className="bg-input/10"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
          <span>Head Content</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Inject meta tags, external scripts, or styles into the{" "}
          <code>{"<head>"}</code> of the document.
        </p>
        <div className="h-50 border rounded-md overflow-hidden bg-background/50">
          <RawCodeEditor
            onChange={setHeadContent}
            language="html"
            code={headContent}
          />
        </div>
      </section>
      <AutoCompleteSwitch
        enableAutoComplete={enableHtmlSuggestion}
        setEnableAutoComplete={setEnableHtmlSuggestion}
        language="html"
      />
    </div>
  );
};

const CSSSettings = () => {
  const { enableCssSuggestion, setEnableCssSuggestion } = useEditor();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
        <span>CSS Configuration</span>
      </div>
      <AutoCompleteSwitch
        enableAutoComplete={enableCssSuggestion}
        setEnableAutoComplete={setEnableCssSuggestion}
        language="Css"
      />
    </div>
  );
};
const JSSettings = () => {
  const { enableJsSuggestion, setEnableJsSuggestion } = useEditor();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
        <span>Js Configuration</span>
      </div>
      <AutoCompleteSwitch
        enableAutoComplete={enableJsSuggestion}
        setEnableAutoComplete={setEnableJsSuggestion}
        language="Js"
      />
    </div>
  );
};

const ActiveSettings = ({ activeLanguage }: { activeLanguage: string }) => {
  const renderSpecificSettings = () => {
    switch (activeLanguage) {
      case "html":
        return <HTMLSettings />;
      case "css":
        return <CSSSettings />;
      case "javascript":
        return <JSSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {renderSpecificSettings()}
      <EditorPreferences language={activeLanguage} />
    </div>
  );
};

export const EditorSettingsDrawer = ({
  activeLanguage,
}: EditorSettingsDrawerProps) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className="bg-muted-foreground/10 hover:bg-muted-foreground/20 p-1.5 rounded-sm transition-colors"
        >
          <Settings className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="md:min-w-125 sm:max-w-[90%] outline-none">
        <DrawerHeader className="border-b bg-muted/10 pb-6">
          <DrawerTitle className="">
            {activeLanguage.toUpperCase()} Settings
          </DrawerTitle>
          <DrawerDescription>
            Configure how your {activeLanguage} code is processed and rendered.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-6">
          <ActiveSettings activeLanguage={activeLanguage} />
        </ScrollArea>

        <DrawerFooter className="border-t bg-muted/20">
          <DrawerClose asChild>
            <Button variant="secondary" className="w-full">
              Close Settings
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
