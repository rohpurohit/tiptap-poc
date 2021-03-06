import React, { useState, useEffect } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
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
import {
  AddClearBtnDiv,
  CommentBox,
  CommentDetails,
  CommentIn,
  MainDivComments,
  Tabs,
  TemplateCommentDiv,
} from "./styles";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import suggestion from "./Mentions/Suggestion";
import { getSuggestions } from "./Mentions/SuggestionItems";
import Realtime from "./Realtime";
import DraggableItem from "./Draggable/DraggableItem";

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

const Tiptap = () => {
  const [isCommentModeOn, setIsCommentModeOn] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      DraggableItem,
      CustomLink.configure({
        linkOnPaste: false,
      }),
      Embed,
      Comment.configure({ isCommentModeOn: !!isCommentModeOn }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Realtime.configure({
        user: {
          name: "Cyndi Lauper",
          color: "#f783ac",
        },
      }),
      Placeholder.configure({
        placeholder: "use / command to see different options",
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          items: getSuggestions,
          render: suggestion,
        },
      }),
      DragHandler,
      CustomParagraph,
      Iframe,
      PasteHandler,
      SnippetExtension,
    ],
    content: ``,
    onUpdate({ editor }) {
      findCommentsAndStoreValues(editor);
      setCurrentComment(editor);
    },

    onSelectionUpdate({ editor }) {
      setCurrentComment(editor);
      setIsCommentModeOn(true);
      setIsTextSelected(!!editor.state.selection.content().size);
    },

    onCreate({ editor }) {
      findCommentsAndStoreValues(editor);
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

  const [currentUserName, setCurrentUserName] = useState("Test User");

  const [commentText, setCommentText] = useState("");

  const [showCommentMenu, setShowCommentMenu] = useState(false);

  const [isTextSelected, setIsTextSelected] = useState(false);

  const [showAddCommentSection, setShowAddCommentSection] = useState(true);

  const formatDate = (d) => (d ? format(new Date(d), dateTimeFormat) : null);

  const [activeCommentsInstance, setActiveCommentsInstance] = useState({
    uuid: "",
    comments: "",
  });
  const [allComments, setAllComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const findCommentsAndStoreValues = (editor) => {
    const tempComments = [];

    editor?.state.doc.descendants((node, pos) => {
      const { marks } = node;
      marks.forEach((mark) => {
        if (mark.type.name === "comment") {
          const markComments = mark.attrs.comment;
          const jsonComments = markComments ? JSON.parse(markComments) : null;

          if (jsonComments !== null) {
            tempComments.push({
              node,
              jsonComments,
              from: pos,
              to: pos + (node.text?.length || 0),
              text: node.text,
            });
          }
        }
      });
    });
    setAllComments([...tempComments]);
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

  const focusContent = ({ from, to }) => {
    editor?.chain().setTextSelection({ from, to }).run();
  };

  const handelActiveThread = (clickedComment) => {
    focusContent({ from: clickedComment.from, to: clickedComment.to });
    setActiveCommentsInstance({
      uuid: clickedComment.jsonComments.uuid,
      comments: clickedComment.jsonComments.comments,
      comment: clickedComment.jsonComments.comments,
    });
  };

  useEffect(() => {
    setTimeout(findCommentsAndStoreValues, 100);
  }, []);

  const html = editor && editor.getHTML();

  // useEffect(() => {
  //   if (editor && editor.isFocused && inputValue.length < 1) {
  //     editor.commands.toggleMenu();
  //   }
  // }, [editor, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const shouldShow = ({ editor, view, state, oldState }) => {
    const mention = editor.extensionManager.extensions.find(
      ({ config, name }) => config.name === "extension" && name === "mention"
    );
    if (mention && mention.options.showMenu) {
      return true;
    }
    return false;
  };

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
          <Button
            variant="contained"
            style={{ marginLeft: "0.5em" }}
            onClick={handleNewTemplate}
          >
            Create
          </Button>
        </section>
        <main style={{ display: "flex" }}>
          <div style={{ flex: "1 1 30%",height:"70vh", marginRight: "4em" }}>
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
                <TemplateCommentDiv>
                  {allComments.map((comment, i) => {
                    return (
                      <MainDivComments
                        key={i + "comment-box"}
                        onClick={() => handelActiveThread(comment)}
                      >
                        <h3>{"  -  " + comment.text} ????</h3>
                        <CommentBox key={i + "external_comment"}>
                          {comment.jsonComments.comments.map(
                            (jsonComment, j) => {
                              return (
                                <CommentIn key={`${j}_${Math.random()}`}>
                                  <CommentDetails className="comment-details">
                                    <ul>
                                      <li>
                                        <strong>
                                          {jsonComment.userName + "  - "}
                                        </strong>

                                        <small>
                                          {formatDate(jsonComment.time)}
                                        </small>
                                      </li>
                                    </ul>
                                  </CommentDetails>

                                  <span className="content">
                                    {jsonComment.content}
                                  </span>
                                </CommentIn>
                              );
                            }
                          )}

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

                              <AddClearBtnDiv>
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
                              </AddClearBtnDiv>
                            </section>
                          )}
                        </CommentBox>
                      </MainDivComments>
                    );
                  })}
                </TemplateCommentDiv>
              )}
            </>
          </div>
        </main>
      </div>
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={shouldShow}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onPaste={handleInputChange}
            placeholder={"paste figma link"}
            size="50"
          />
          <button
            onClick={() => {
              editor.commands.embed({ href: inputValue });
              editor.commands.toggleMenu();
              setInputValue("");
              editor.commands.focus("end");
            }}
          >
            submit
          </button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          tippy-options={{ duration: 100, placement: "bottom" }}
          editor={editor}
          className="bubble-menu"
          // shouldShow={({editor}) => (isCommentModeOn &&!editor.state.selection.empty && !activeCommentsInstance.uuid)}
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

            <AddClearBtnDiv>
              <button
                className="cursor-pointer bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded shadow-lg w-1/3"
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
            </AddClearBtnDiv>
          </section>
        </BubbleMenu>
      )}
    </>
  );
};

export default Tiptap;
