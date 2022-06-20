import React, { useState, useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Commands from "./Slash/Commands";
import getSuggestionItems from "./Slash/items";
import renderItems from "./Slash/renderItems";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import DragHandler from "./DraggableItem";
import MenuBar from "./MenuBar";
import Image from "@tiptap/extension-image";
import Iframe from "./Iframe";
import Preview from "./LinkPreview/Preview";
import PasteHandler from "./LinkPreview/PasteHandler";
import Embed from "./LinkPreview/Embed";
import { SnippetExtension } from "./Snippets/Snippets";
import "./index.css";
import "./styles.css";
import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "./Comments/Comment";
import { Button, Divider } from "@mui/material";
import { Tabs } from "./styles";
import * as Y from "yjs";

const dateTimeFormat = "dd.MM.yyyy HH:mm";

const CustomParagraph = Paragraph.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
const CustomLink = Link.extend({
  addNodeView() {
    return ReactNodeViewRenderer(Preview);
  },
});

const snippets = [
  {
    name: "Test",
    content: "<p> This is a test. </p>",
  },
  {
    name: "Some demo",
    content:
      "<p><strong>This is bold.</strong> <em>This is italic. </em><code>This is code</code></p>",
  },
];
// const provider = new HocuspocusProvider({
//   url: "ws://127.0.0.1:1234",
//   name: "example-document",
// });
const ydoc = new Y.Doc();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tiptap = () => {
  const [newTemplateName, setNewTemplateName] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CustomLink.configure({
        linkOnPaste: false,
      }),
      Embed,
      Comment,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      DragHandler,
      CustomParagraph,
      Iframe,
      PasteHandler,
      SnippetExtension,
    ],
    content: `<p> use / command to see different options</p>
    <ul>
      <li>Select text to comment</li>
      <li>Drag from templates on the right</li>
      <li>Copy link to see link preview</li>
    </ul>
    
    `,
    onUpdate({ editor }) {
      findCommentsAndStoreValues();

      setCurrentComment(editor);
    },

    onSelectionUpdate({ editor }) {
      setCurrentComment(editor);

      setIsTextSelected(!!editor.state.selection.content().size);
    },

    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  const onDragStart = (event, snippet) => {
    event?.dataTransfer?.setData("text/html", snippet);
  };
  const handleNewTemplateName = (event) => {
    setNewTemplateName(event.target.value);
  };
  const handleNewTemplate = () => {
    const snippet = {
      name: newTemplateName,
      content: editor.getHTML() || "<p> Snippet failed </p>",
    };
    snippets.push(snippet);
    setNewTemplateName("");
  };
  // const links = editor.getAttributes("link");
  // console.log(editor);

  //  #Comments Module Start
  const [activeTab, setActiveTab] = useState(0);

  const [isCommentModeOn, setIsCommentModeOn] = useState(true);

  const [currentUserName, setCurrentUserName] = useState("Test User");

  const [commentText, setCommentText] = useState("");

  const [showCommentMenu, setShowCommentMenu] = useState(false);

  const [isTextSelected, setIsTextSelected] = useState(false);

  const [showAddCommentSection, setShowAddCommentSection] = useState(true);

  const formatDate = (d) => (d ? format(new Date(d), dateTimeFormat) : null);

  const [activeCommentsInstance, setActiveCommentsInstance] = useState({});

  const [allComments, setAllComments] = useState([]);

  const findCommentsAndStoreValues = () => {
    const proseMirror = document.querySelector(".ProseMirror");

    const comments = proseMirror?.querySelectorAll("span[data-comment]");

    const tempComments = [];

    if (!comments) {
      setAllComments([]);
      return;
    }

    comments.forEach((node) => {
      const nodeComments = node.getAttribute("data-comment");

      const jsonComments = nodeComments ? JSON.parse(nodeComments) : null;

      if (jsonComments !== null) {
        tempComments.push({
          node,
          jsonComments,
        });
      }
    });

    setAllComments(tempComments);
  };

  const setCurrentComment = (editor) => {
    const newVal = editor.isActive("comment");

    if (newVal) {
      setTimeout(() => setShowCommentMenu(newVal), 50);

      setShowAddCommentSection(!editor.state.selection.empty);

      const parsedComment = JSON.parse(editor.getAttributes("comment").comment);

      parsedComment.comment =
        typeof parsedComment.comments === "string"
          ? JSON.parse(parsedComment.comments)
          : parsedComment.comments;

      setActiveCommentsInstance(parsedComment);
    } else {
      setActiveCommentsInstance({});
    }
  };

  const setComment = () => {
    if (!commentText.trim().length) return;

    const activeCommentInstance = JSON.parse(
      JSON.stringify(activeCommentsInstance)
    );

    const commentsArray =
      typeof activeCommentInstance.comments === "string"
        ? JSON.parse(activeCommentInstance.comments)
        : activeCommentInstance.comments;

    if (commentsArray) {
      commentsArray.push({
        userName: currentUserName,
        time: Date.now(),
        content: commentText,
      });

      const commentWithUuid = JSON.stringify({
        uuid: activeCommentsInstance.uuid || uuidv4(),
        comments: commentsArray,
      });

      // eslint-disable-next-line no-unused-expressions
      editor?.chain().setComment(commentWithUuid).run();
    } else {
      const commentWithUuid = JSON.stringify({
        uuid: uuidv4(),
        comments: [
          {
            userName: currentUserName,
            time: Date.now(),
            content: commentText,
          },
        ],
      });

      // eslint-disable-next-line no-unused-expressions
      editor?.chain().setComment(commentWithUuid).run();
    }

    setTimeout(() => setCommentText(""), 50);
  };

  const toggleCommentMode = () => {
    setIsCommentModeOn(!isCommentModeOn);

    if (isCommentModeOn) editor?.setEditable(false);
    else editor?.setEditable(true);
  };

  useEffect(() => {
    setTimeout(findCommentsAndStoreValues, 100);
  }, []);

  // #Comments Module End
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1em",
          margin: "1em 1em",
          flexDirection: "column",
        }}
      >
        <h2 className="text-3xl font-bold ">Tiptap Editor</h2>
        <section className="buttons-section">
          <Button
            variant="contained"
            onClick={() => toggleCommentMode()}
            type="button"
          >
            {isCommentModeOn ? "Comment mode ON" : "Comment mode OFF"}
          </Button>
          <input
            type="text"
            placeholder="Create New template"
            onChange={handleNewTemplateName}
            value={newTemplateName}
            style={{
              padding: "0.6em",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginLeft: "1em",
            }}
          />
          <Button variant="contained" onClick={handleNewTemplate}>
            Create
          </Button>
        </section>
        <main style={{ display: "flex" }}>
          <div style={{ flex: "1 1 30%", marginRight: "4em" }}>
            <MenuBar editor={editor} />
            <EditorContent className="editor" editor={editor} />
          </div>
          <div
            style={{
              border: "2px solid #cd853f",
              borderRadius: "10px",
              overflow: "auto",
              flex: "1 1 10%",
              marginRight: "10em",
            }}
          >
            <>
              <div
                style={{
                  display: "flex",
                  marginBottom: "1em",
                }}
              >
                <Tabs active={activeTab === 0} onClick={() => setActiveTab(0)}>
                  Templates
                </Tabs>
                <Divider orientation="vertical" flexItem />
                <Tabs active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Comments
                </Tabs>
              </div>
              {activeTab === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  {snippets.map(({ name, content }) => {
                    return (
                      <Button
                        variant="contained"
                        draggable="true"
                        className="snippet"
                        key={`snippet-${name}`}
                        style={{
                          padding: "8px 1rem",
                          border: "1px solid gray",
                          borderRadius: "8px",
                          cursor: "pointer",
                          margin: "0 10em",
                        }}
                        onDragStart={(e) => onDragStart(e, content)}
                      >
                        {name}
                      </Button>
                    );
                  })}
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  {allComments.map((comment, i) => {
                    return (
                      <article key={i + "external_comment"}>
                        {comment.jsonComments.comments.map((jsonComment, j) => {
                          return (
                            <article key={`${j}_${Math.random()}`}>
                              <div className="comment-details">
                                <strong>{jsonComment.userName}</strong>

                                <span>{formatDate(jsonComment.time)}</span>
                              </div>

                              <span className="content">
                                {jsonComment.content}
                              </span>
                            </article>
                          );
                        })}

                        {comment.jsonComments.uuid ===
                          activeCommentsInstance.uuid && (
                          <section>
                            <textarea
                              value={commentText}
                              onInput={(e) => setCommentText(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.keyCode === 13) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setComment();
                                }
                              }}
                              cols={30}
                              rows={4}
                              placeholder="Add comment..."
                              className="border-none outline-none"
                            />

                            <section>
                              <Button
                                variant="contained"
                                onClick={() => setCommentText("")}
                              >
                                Clear
                              </Button>

                              <Button
                                variant="contained"
                                onClick={() => setComment()}
                              >
                                Add (<kbd className="">Ent</kbd>)
                              </Button>
                            </section>
                          </section>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          </div>
        </main>
      </div>
      {editor && (
        <BubbleMenu
          tippy-options={{ duration: 100, placement: "bottom" }}
          editor={editor}
          className="bubble-menu"
          // shouldShow={() => (isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid)}
        >
          <section className="comment-adder-section bg-white shadow-lg">
            <textarea
              value={commentText}
              onInput={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.stopPropagation();
                  setComment();
                }
              }}
              cols={30}
              rows={4}
              placeholder="Add comment..."
              className="border-none outline-none"
            />

            <section className="flex flex-row w-full gap-1">
              <button
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded shadow-lg w-1/3"
                onClick={() => setCommentText("")}
              >
                Clear
              </button>

              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-lg w-2/3"
                onClick={() => setComment()}
              >
                Add
              </button>
            </section>
          </section>
        </BubbleMenu>
      )}
    </>
  );
};

export default Tiptap;
