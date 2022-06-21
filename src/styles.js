import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  margin: 0 0.5em;
`;
export const Tabs = styled.div`
  flex: 1 1 0;
  text-align: center;
  padding: 1em;
  border-bottom: ${({ active }) =>
    active ? "2px solid #cd853f" : "2px solid #a89e9e8c"};
  cursor: pointer !important;
`;

export const MenuButton = styled(Button)`
  font-size:1.25rem !important;
  margin-bottom:.5rem !important;
`;

export const CommentBox = styled('div')`
  display:flex;
  flex-direction:column;
  width:90%;
  margin:0 auto;
  align-items:center;
`;

export const CommentIn = styled('div')`
  width:260px;
  margin:10px 0;
`;

export const CommentDetails = styled('div')`
`;

export const TemplateCommentDiv = styled('div')`
  overflow-y:scroll;
  height:40vh;
  padding:0 20px 20px;
`;

export const AddClearBtnDiv = styled('div')`
  display: flex;
  gap: 10px;
`;

export const MainDivComments = styled('div')`
  margin-bottom:16px;
`;