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
  // "ws:52.13.17.64:1234",
  "ws:localhost:4444",
  "tiptap-demo",
  ydoc
);
const type = ydoc.getXmlFragment("prosemirror");
const awarenessStatesToArray = (states) => {
  return Array.from(states.entries()).map(([key, value]) => {
    return {
      clientId: key,
      ...value.user,
    };
  });
};
const defaultOnUpdate = () => null;

const Realtime = Extension.create({
  name: "realtime",
  addOptions() {
    return {
      user: {
        name: null,
        color: null,
      },
      render: (user) => {
        const cursor = document.createElement("span");

        cursor.classList.add("collaboration-cursor__caret");
        cursor.setAttribute("style", `border-color: ${user.color}`);

        const label = document.createElement("div");

        label.classList.add("collaboration-cursor__label");
        label.setAttribute("style", `background-color: ${user.color}`);
        label.insertBefore(document.createTextNode(user.name), null);
        cursor.insertBefore(label, null);

        return cursor;
      },
      onUpdate: defaultOnUpdate,
    };
  },
  addStorage() {
    return {
      users: [],
    };
  },

  addCommands() {
    return {
      updateUser: (attributes) => () => {
        this.options.user = attributes;

        provider.awareness.setLocalStateField("user", this.options.user);

        return true;
      },
      user:
        (attributes) =>
        ({ editor }) => {
          console.warn(
            '[tiptap warn]: DEPRECATED: The "user" command is deprecated. Please use "updateUser" instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor'
          );

          return editor.commands.updateUser(attributes);
        },
    };
  },
  addProseMirrorPlugins() {
    return [
      ySyncPlugin(type),
      yCursorPlugin(
        (() => {
          provider.awareness.setLocalStateField("user", this.options.user);

          this.storage.users = awarenessStatesToArray(
            provider.awareness.states
          );

          provider.awareness.on("update", () => {
            this.storage.users = awarenessStatesToArray(
              provider.awareness.states
            );
          });

          return provider.awareness;
        })(),
        {
          cursorBuilder: this.options.render,
        }
      ),
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
