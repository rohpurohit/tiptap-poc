import ReactComponent from "../LinkPreview/ReactPreview";
import {
  RiDoubleQuotesL,
  RiH1,
  RiH2,
  RiH3,
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiListOrdered,
  RiListUnordered,
  RiListCheck2,
} from "react-icons/ri";

const getSuggestionItems = () => {
  return [
    {
      title: "Heading 1",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
      icon: RiH1,
      shortcut: "#",
    },
    {
      title: "Heading 2",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
      icon: RiH2,
      shortcut: "##",
    },
    {
      title: "Heading 3",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
      icon: RiH3,
      shortcut: "###",
    },
    {
      title: "Ordered List",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
      icon: RiListOrdered,
      shortcut: "1. L",
    },
    {
      title: "Bullet List",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
      icon: RiListUnordered,
      shortcut: "- L",
    },
    // {
    //   title: "Task List",
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).toggleTaskList().run();
    //   },
    //   icon: RiListCheck2,
    // },
    {
      title: "Blockquote",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setBlockquote().run();
      },
      icon: RiDoubleQuotesL,
      shortcut: ">",
    },
    {
      title: "Code Block",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setCodeBlock({ language: "auto" })
          .run();
      },
      icon: RiCodeBoxLine,
      shortcut: "```",
    },
    {
      title: "Bold",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      },
      icon: RiBold,
      shortcut: "**b**",
    },
    {
      title: "Italic",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      },
      icon: RiItalic,
      shortcut: "_i_",
    },
    {
      title: "Underline",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("underline").run();
      },
      icon: RiUnderline,
    },
    {
      title: "Strike",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("strike").run();
      },
      icon: RiStrikethrough,
      shortcut: "~~s~~",
    },
    {
      title: "Code",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("code").run();
      },
      icon: RiCodeSSlashLine,
      shortcut: "`i`",
    },
    {
      title: "Figma",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleMenu().run();
      },
      icon: RiCodeSSlashLine,
      shortcut: "`i`",
    },
  ];
};

export default getSuggestionItems;
