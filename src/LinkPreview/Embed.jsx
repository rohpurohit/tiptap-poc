import { mergeAttributes } from "@tiptap/core";
import * as React from "react";
// import Node from "./Node";
import { Node, ReactNodeViewRenderer } from "@tiptap/react";
import embeds from "./constants";
import Preview from "./Preview";
import Figma from "../embeds/Figma";
const cache = {};

export default Node.create({
  name: "embed",

  content: "inline*",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      href: {
        default: "",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "embed",
        getAttrs: (dom) => {
          const href = dom.getAttribute("src") || "";
          console.log(embeds);
          if (embeds) {
            for (const embed of embeds) {
              const matches = embed.matcher(href);
              if (matches) {
                return {
                  href,
                };
              }
            }
          }

          return {};
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "embed",
      mergeAttributes(HTMLAttributes, { src: this.options.href }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Figma);
  },
  addCommands() {
    return {
      embed:
        (options) =>
        ({ tr, dispatch }) => {
          const node = this.type.create(options);
          console.log("options", node);

          if (dispatch) {
            tr.replaceSelectionWith(node);
          }

          return true;
        },
    };
  },
});
