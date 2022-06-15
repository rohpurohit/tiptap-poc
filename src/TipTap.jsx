import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Commands from "./Slash/Commands";
import getSuggestionItems from "./Slash/items";
import renderItems from "./Slash/renderItems";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import DragHandler from "./DraggableItem";
import MenuBar from "./MenuBar";
import Image from "@tiptap/extension-image";
import Iframe from "./Iframe";
import Preview from "./LinkPreview/Preview";
import PasteHandler from "./LinkPreview/PasteHandler";
import Embed from "./LinkPreview/Embed";
import { SnippetExtension } from "./Snippets/Snippets";
import "./styles.css";
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

const snippets = [
  {
    name: "Test",
    content: "<p> This is a test. </p>",
  },
  {
    name: "Some demo",
    content:
      "<p><strong>This is bold.</strong> <em>This is italic. </em><code>This is code</code></p>",
  },
];
// const provider = new HocuspocusProvider({
//   url: "ws://127.0.0.1:1234",
//   name: "example-document",
// });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tiptap = () => {
  const [newTemplateName, setNewTemplateName] = useState("");
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
      SnippetExtension,
    ],
    content: `<p> use / command to see different options</p>
    drag from the templates on right
    `,
  });

  const onDragStart = (event, snippet) => {
    event?.dataTransfer?.setData("text/html", snippet);
  };
  const handleNewTemplateName = (event) => {
    setNewTemplateName(event.target.value);
  };
  const handleNewTemplate = () => {
    const snippet = {
      name: newTemplateName,
      content: editor.getHTML() || "<p> Snippet failed </p>",
    };
    snippets.push(snippet);
    setNewTemplateName("");
  };
  // const links = editor.getAttributes("link");
  // console.log(editor);
  return (
    <div
      style={{
        display: "flex",
        gap: "3em",
        margin: "2em 1em",
      }}
    >
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
        <div>
          <button>Create New template from current editor content </button>
          <input
            type="text"
            placeholder="New template name"
            onChange={handleNewTemplateName}
            value={newTemplateName}
          />
          <button onClick={handleNewTemplate}>Create</button>
        </div>
        <EditorContent editor={editor} className="editor" id="editorContent" />
      </div>
      <div
        style={{
          display: "flex",
          gap: "1em",
          width: "15rem",
          flexDirection: "column",
          margin: "11em 0 1em",
        }}
      >
        <>
          <h4>Templates</h4>
          {snippets.map(({ name, content }) => {
            return (
              <button
                draggable="true"
                className="snippet"
                key={`snippet-${name}`}
                style={{
                  padding: "8px 1rem",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onDragStart={(e) => onDragStart(e, content)}
              >
                {name}
              </button>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Tiptap;
