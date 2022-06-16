import React, { useCallback, useRef } from "react";
import "./styles.css";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

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

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "0.1em",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => inputImage.current.click()}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Add Image
        </button>
        <button
          onClick={addIframe}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          Add video url
        </button>
        <input
          type="file"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={addImage}
        />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("code") ? "is-active" : ""
          }`}
        >
          code
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          clear marks
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("paragraph") ? "is-active" : ""
          }`}
        >
          paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }`}
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }`}
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }`}
        >
          h3
        </button>
        <div>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }`}
          >
            h4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }`}
          >
            h5
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }`}
          >
            h6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("bulletList") ? "is-active" : ""
            }`}
          >
            bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("orderedList") ? "is-active" : ""
            }`}
          >
            ordered list
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("codeBlock") ? "is-active" : ""
            }`}
          >
            code block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              editor.isActive("blockquote") ? "is-active" : ""
            }`}
          >
            blockquote
          </button>

          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            horizontal rule
          </button>
          <button
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            hard break
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            redo
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
