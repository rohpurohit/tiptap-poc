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

  // component({ isEditable, isSelected, theme, node }) {
  //   const { embeds } = this.editor.props;

  //   // matches are cached in module state to avoid re running loops and regex
  //   // here. Unfortunately this function is not compatible with React.memo or
  //   // we would use that instead.
  //   const hit = cache[node.attrs.href];
  //   let Component = hit ? hit.Component : undefined;
  //   let matches = hit ? hit.matches : undefined;
  //   let embed = hit ? hit.embed : undefined;

  //   if (!Component) {
  //     for (const e of embeds) {
  //       const m = e.matcher(node.attrs.href);
  //       if (m) {
  //         Component = e.component;
  //         matches = m;
  //         embed = e;
  //         cache[node.attrs.href] = { Component, embed, matches };
  //       }
  //     }
  //   }

  //   if (!Component) {
  //     return null;
  //   }

  //   return (
  //     <Component
  //       attrs={{ ...node.attrs, matches }}
  //       isEditable={isEditable}
  //       isSelected={isSelected}
  //       theme={theme}
  //     />
  //   );
  // }

  // addCommands() {
  //   return {
  //     embed:
  //       () =>
  //       ({ commands }) => {
  //         return commands.setNode("paragraph");
  //       },
  //   };
  // }
  // commands({ type }) {
  //   return (attrs) => (state, dispatch) => {
  //     dispatch(
  //       state.tr.replaceSelectionWith(type.create(attrs)).scrollIntoView()
  //     );
  //     return true;
  //   };
  // },
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
