import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import renderItems from "./Slash/renderItems";

const DragHandle = () => {
  return (
    <NodeViewWrapper className="draggable-item">
      <div
        className="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default DragHandle;
