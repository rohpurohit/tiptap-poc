import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

const Commands = Extension.create({
  name: "mention",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
      },
      showMenu: false,
    };
  },

  toggleMenu() {
    return this.options.showMenu;
  },

  addCommands() {
    return {
      toggleMenu:
        (options) =>
        ({ commands }) => {
          this.options.showMenu = !this.options.showMenu;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default Commands;
