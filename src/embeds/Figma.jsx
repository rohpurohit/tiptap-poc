import * as React from "react";
import Frame from "./Frame";
import { NodeViewWrapper } from "@tiptap/react";

const Figma = (props) => {
  console.log("Figma", props.node.attrs.href);
  return (
    <NodeViewWrapper className="react-component">
      <Frame
        {...props}
        src={`https://www.figma.com/embed?embed_host=outline&url=${props.node.attrs.href}`}
        title="Figma Embed"
        border
      />
    </NodeViewWrapper>
  );
};

export default Figma;
