import { Button } from "@mui/material";
import React, { useCallback, useRef } from "react";
import "./styles.css";
import { StyledButton } from "./styles";
import {
  MdArrowDropDown,
  MdAutoAwesome,
  MdChecklist,
  MdImage,
  MdCode,
  MdDesktopMac,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatClear,
  MdFormatIndentDecrease,
  MdFormatIndentIncrease,
  MdFormatItalic,
  MdFormatLineSpacing,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdHorizontalRule,
  MdLaptop,
  MdLink,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
  MdPhone,
  MdPrint,
  MdRedo,
  MdScreenshot,
  MdOutlineVideoLibrary,
  MdSettings,
  MdTableChart,
  MdTablet,
  MdUndo,
} from "react-icons/md";
import { CgQuote } from "react-icons/cg";
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
        <Button onClick={() => inputImage.current.click()}>
          <MdImage />
        </Button>
        <Button onClick={addIframe}>
          <MdOutlineVideoLibrary />
        </Button>
        <input
          type="file"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={addImage}
        />
        <Button onClick={() => editor.chain().focus().toggleBold().run()}>
          <MdFormatBold />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <MdFormatItalic />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <MdFormatStrikethrough />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleCode().run()}>
          <CgQuote />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <MdFormatListBulleted />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered />
        </Button>

        <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <MdCode />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <MdFormatQuote />
        </Button>

        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule />
        </Button>
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <MdUndo />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <MdRedo />
        </Button>
      </div>
    </>
  );
};

export default MenuBar;
