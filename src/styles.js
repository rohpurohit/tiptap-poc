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
`;
