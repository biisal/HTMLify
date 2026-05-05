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
  disableAutoComplete,
  setDisableAutoComplete,
  language,
}: {
  disableAutoComplete: boolean;
  setDisableAutoComplete: (v: boolean) => void;
  language: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={"disable-auto-complete-" + language}
        checked={disableAutoComplete}
        onCheckedChange={setDisableAutoComplete}
      />
      <Label htmlFor={"disable-auto-complete-" + language}>
        Disable Auto Complete for {language}
      </Label>
    </div>
  );
}

const HTMLSettings = () => {
  const {
    headContent,
    setHeadContent,
    bodyClasses,
    setBodyClasses,
    htmlLang,
    setHtmlLang,
    disableHtmlSuggetion,
    setDisableHtmlSuggetion,
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
        disableAutoComplete={disableHtmlSuggetion}
        setDisableAutoComplete={setDisableHtmlSuggetion}
        language="html"
      />
    </div>
  );
};

const CSSSettings = () => {
  const { disableCssSuggetion, setDisableCssSuggetion } = useEditor();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
        <span>CSS Configuration</span>
      </div>
      <AutoCompleteSwitch
        disableAutoComplete={disableCssSuggetion}
        setDisableAutoComplete={setDisableCssSuggetion}
        language="Css"
      />
    </div>
  );
};
const JSSettings = () => {
  const { disableJsSuggetion, setDisableJsSuggetion } = useEditor();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
        <span>Js Configuration</span>
      </div>
      <AutoCompleteSwitch
        disableAutoComplete={disableJsSuggetion}
        setDisableAutoComplete={setDisableJsSuggetion}
        language="Css"
      />
    </div>
  );
};

const ActiveSettings = ({ activeLanguage }: { activeLanguage: string }) => {
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
