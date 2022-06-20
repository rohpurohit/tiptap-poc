import { Button } from "@mui/material";
import React, { useCallback, useRef } from "react";
import "./styles.css";
import { MenuButton } from "./styles";
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
        <MenuButton onClick={() => inputImage.current.click()}>
          <MdImage />
        </MenuButton>
        <MenuButton onClick={addIframe}>
          <MdOutlineVideoLibrary />
        </MenuButton>
        <input
          type="file"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={addImage}
        />
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()}>
          <MdFormatBold />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()}>
          <MdFormatItalic />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()}>
          <MdFormatStrikethrough />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()}>
          <CgQuote />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <MdFormatListBulleted />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered />
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <MdCode />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <MdFormatQuote />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <MdUndo />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <MdRedo />
        </MenuButton>
      </div>
    </>
  );
};

export default MenuBar;
