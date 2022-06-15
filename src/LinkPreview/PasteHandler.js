import * as React from "react";
import { toggleMark } from "prosemirror-commands";
import { Plugin } from "prosemirror-state";
import { isInTable } from "prosemirror-tables";
import { Extension } from "@tiptap/core";
import embeds from "./constants";
function isUrl(text) {
  if (text.match(/\n/)) {
    return false;
  }

  try {
    const url = new URL(text);
    return url.hostname !== "";
  } catch (err) {
    return false;
  }
}

function isDropboxPaper(html) {
  // The best we have to detect if a paste is likely coming from Paper
  // In this case it's actually better to use the text version
  return html?.includes("usually-unique-id");
}

const PasteHandler = Extension.create({
  name: "markdown-paste",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          transformPastedHTML(html) {
            if (isDropboxPaper(html)) {
              // Fixes double paragraphs when pasting from Dropbox Paper
              html = html.replace(/<div><br><\/div>/gi, "<p></p>");
            }
            return html;
          },
          handlePaste: (view, event) => {
            if (view.props.editable && !view.props.editable(view.state)) {
              return false;
            }
            if (!event.clipboardData) {
              return false;
            }

            const text = event.clipboardData.getData("text/plain");
            const { state, dispatch } = view;
            // first check if the clipboard contents can be parsed as a single
            // url, this is mainly for allowing pasted urls to become embeds
            if (isUrl(text)) {
              // just paste the link mark directly onto the selected text
              if (!state.selection.empty) {
                toggleMark(this.editor.schema.marks.link, { href: text })(
                  state,
                  dispatch
                );
                return true;
              }

              // Is this link embeddable? Create an embed!
              this.editor.commands.embed({
                href: text,
              });
              return true;
            }

            // otherwise use the default HTML parser which will handle all paste
            // "from the web" events
            return false;
          },
        },
      }),
    ];
  },
});

export default PasteHandler;
