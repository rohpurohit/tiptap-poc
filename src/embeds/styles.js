import styled from "styled-components";
export const Iframe = styled.iframe`
  border-radius: ${(props) => (props.withBar ? "3px 3px 0 0" : "3px")};
  display: block;
`;

export const Rounded = styled.div`
  border: 1px solid
    ${(props) => (props.$border ? props.theme.embedBorder : "transparent")};
  border-radius: 6px;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => (props.$withBar ? props.height + 28 : props.height)};
`;

export const Open = styled.a`
  color: ${(props) => props.theme.textSecondary} !important;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
  padding: 0 8px;
`;

export const Title = styled.span`
  font-size: 13px;
  font-weight: 500;
  padding-left: 4px;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.embedBorder};
  background: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.textSecondary};
  padding: 0 8px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  user-select: none;
`;
