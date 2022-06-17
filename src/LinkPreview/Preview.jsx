import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { NodeViewWrapper } from "@tiptap/react";
import Frame from "../embeds/Frame";

const Preview = (props) => {
  // console.log("Preview", props.node.attrs.href);
  return (
    <NodeViewWrapper className="react-component">
      <LinkPreview
        url={props.node.attrs.href}
        // url="https://google.com"
        width="400px"
        descriptionLength={50}
      />
    </NodeViewWrapper>
  );
};

export default Preview;
