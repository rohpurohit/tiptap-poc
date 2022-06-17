import { Button } from "@mui/material";
import React, { useCallback, useRef } from "react";
import "./styles.css";
import { StyledButton } from "./styles";

const MenuBar = ({ editor }) => {
  const inputImage = useRef();
  const addImage = (e) => {
    const { files } = e.target;
    if (!!e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
    }
  };

  const addIframe = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      var updatedUrl = url.replace("watch?v=", "embed/");
      editor.chain().focus().setIframe({ src: updatedUrl }).run();
    }
  }, [editor]);
  if (!editor) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "0.1em",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          onClick={() => inputImage.current.click()}
          className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semibold hover:text-white py-2 px-4 border border-blue-500
          hover:border-transparent rounded"
        >
          {" "}
          Add Image
        </Button>
        <Button
          variant="contained"
          onClick={addIframe}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          {" "}
          Add video url
        </Button>
        <input
          type="file"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={addImage}
        />
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
        >
          {" "}
          bold
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
        >
          {" "}
          italic
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          {" "}
          strike
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("code") ? "is-active" : ""
          }`}
        >
          {" "}
          code
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semibold hover:text-white py-2 px-4 border border-blue-500
          hover:border-transparent rounded"
        >
          {" "}
          clear marks
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semibold hover:text-white py-2 px-4 border border-blue-500
          hover:border-transparent rounded"
        >
          {" "}
          clear nodes
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("paragraph") ? "is-active" : ""
          }`}
        >
          {" "}
          paragraph
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }`}
        >
          {" "}
          h1
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }`}
        >
          {" "}
          h2
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }`}
        >
          {" "}
          h3
        </Button>
        <div
          style={{
            display: "flex",
            gap: "0.1em",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }`}
          >
            {" "}
            h4
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }`}
          >
            {" "}
            h5
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }`}
          >
            {" "}
            h6
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("bulletList") ? "is-active" : ""
            }`}
          >
            {" "}
            bullet list
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("orderedList") ? "is-active" : ""
            }`}
          >
            {" "}
            ordered list
          </Button>

          <Button
            variant="contained"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("codeBlock") ? "is-active" : ""
            }`}
          >
            {" "}
            code block
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("blockquote") ? "is-active" : ""
            }`}
          >
            {" "}
            blockquote
          </Button>

          <Button
            variant="contained"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
          >
            {" "}
            horizontal rule
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
          >
            {" "}
            hard break
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().undo().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
          >
            {" "}
            undo
          </Button>
          <Button
            variant="contained"
            onClick={() => editor.chain().focus().redo().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
          >
            {" "}
            redo
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
