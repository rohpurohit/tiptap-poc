import { keymap } from "prosemirror-keymap";
import { Extension } from "@tiptap/core";
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from "y-prosemirror";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  "wss://demos.yjs.dev",
  "tiptap-demo",
  ydoc
);
const type = ydoc.getXmlFragment("prosemirror");
const Realtime = Extension.create({
  name: "realtime",
  addProseMirrorPlugins() {
    return [
      ySyncPlugin(type),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        "Mod-z": undo,
        "Mod-y": redo,
        "Mod-Shift-z": redo,
      }),
    ];
  },
});
export default Realtime;
