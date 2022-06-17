import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import renderItems from "./Slash/renderItems";

const DragHandle = () => {
  return (
    <NodeViewWrapper class="draggable-item">
      <div
        class="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent class="content" />
    </NodeViewWrapper>
  );
};

export default DragHandle;
