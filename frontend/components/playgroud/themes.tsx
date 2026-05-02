import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

export const ayuDarkTheme = EditorView.theme(
  {
    "&": {
      color: "#b3b1ad",
      backgroundColor: "#0a0e14", // Official Ayu Dark background
    },
    ".cm-content": { caretColor: "#e6b450" },
    "&.cm-focused .cm-cursor": { borderLeftColor: "#e6b450" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "#273747",
    },
    ".cm-gutters": {
      backgroundColor: "#0a0e14",
      color: "#3d424d",
      border: "none",
    },
    ".cm-activeLine": { backgroundColor: "#01060e" },
  },
  { dark: true },
);

export const ayuDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: "#ff8f40" },
  { tag: [t.name, t.deleted, t.propertyName], color: "#b3b1ad" },
  { tag: [t.function(t.variableName), t.labelName], color: "#ffb454" },
  { tag: [t.color, t.constant(t.name)], color: "#ae81ff" },
  { tag: [t.definition(t.name), t.separator], color: "#ffee99" },
  { tag: [t.typeName, t.className, t.number], color: "#e6b450" },
  { tag: [t.operator, t.url, t.regexp], color: "#95e6cb" },
  { tag: [t.meta, t.comment], color: "#626a73", fontStyle: "italic" },
  { tag: t.string, color: "#c2d94c" },
  { tag: t.link, color: "#39bae6", textDecoration: "underline" },
  { tag: t.invalid, color: "#ff3333" },
]);

export const ayuDark = [
  ayuDarkTheme,
  syntaxHighlighting(ayuDarkHighlightStyle),
];
