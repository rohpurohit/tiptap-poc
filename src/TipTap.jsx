import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Commands from "./Slash/Commands";
import getSuggestionItems from "./Slash/items";
import renderItems from "./Slash/renderItems";
import ReactComponent from "./LinkPreview/ReactPreview";
import Link from "@tiptap/extension-link";
import DragHandle from "./DragHandle";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import Collaboration from "@tiptap/extension-collaboration";
import { HocuspocusProvider } from "@hocuspocus/provider";
import CommandsList from "./Slash/CommandsList";
import DragHandler from "./DraggableItem";
import MenuBar from "./MenuBar";
import Image from "@tiptap/extension-image";
import Iframe from "./Iframe";
import { Plugin, PluginKey } from "prosemirror-state";
import Preview from "./LinkPreview/Preview";
import PasteHandler from "./LinkPreview/PasteHandler";
import Embed from "./LinkPreview/Embed";
import ReactPreview from "./LinkPreview/ReactPreview";
const CustomParagraph = Paragraph.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
const CustomLink = Link.extend({
  addNodeView() {
    return ReactNodeViewRenderer(Preview);
  },
});
// const provider = new HocuspocusProvider({
//   url: "ws://127.0.0.1:1234",
//   name: "example-document",
// });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CustomLink.configure({
        linkOnPaste: false,
      }),
      Embed,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      DragHandler,
      CustomParagraph,
      Iframe,
      PasteHandler,
      // ReactPreview,
    ],
    content: `<p> use / command to see different options</p>
    <react-component />
    `,
  });
  // const links = editor.getAttributes("link");
  // console.log(editor);
  return (
    <div
      style={{
        display: "flex",
        gap: "1em",
        flexDirection: "column",
        margin: "2em 1em",
      }}
    >
      <h2>Tiptap Editor</h2>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor" id="editorContent" />
    </div>
  );
};

export default Tiptap;
