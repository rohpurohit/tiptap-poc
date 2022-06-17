import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Preview from "./Preview";

export default Node.create({
  name: "reactComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Preview);
  },
});
