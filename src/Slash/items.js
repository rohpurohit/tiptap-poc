import ReactComponent from "../LinkPreview/ReactPreview";

const getSuggestionItems = () => {
  return [
    {
      title: "H1",
      command: (data) => {
        console.log("data: " + data);
        data.editor
          .chain()
          .focus()
          .deleteRange(data.range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "H2",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "bold",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      },
    },
    {
      title: "italic",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      },
    },
  ];
};

export default getSuggestionItems;
