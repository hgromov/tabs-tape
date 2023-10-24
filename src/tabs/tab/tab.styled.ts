import styled from "styled-components";

import { tabTheme } from "../colors";
import { StyledTabProps } from "../tabs.types";

const StyledTab = styled.div<StyledTabProps>`
  box-sizing: border-box;
  margin-right: 12px;
  font-size: 14px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all ease-in-out 0.3s, background-color 0s;
  user-select: none;
  cursor: pointer;
  border-radius: 1px;
  font-weight: 600;
  padding: 6px 16px;

  color: ${({ isSelected }) =>
    isSelected ? tabTheme.color.selected : tabTheme.color.default};
  background-color: ${({ isSelected }) =>
    isSelected
      ? tabTheme.backgroundColor.hovered
      : tabTheme.backgroundColor.primary};
  min-height: ${({ expandHeight, isExpanded }) =>
    isExpanded ? expandHeight + "px" : "40px"};
  max-height: ${({ expandHeight, isExpanded }) =>
    isExpanded ? expandHeight + "px" : "40px"};
  max-width: ${({ isExpanded }) => (isExpanded ? "380px" : "300px")};
  min-width: ${({ expandWidth, isExpanded }) =>
    isExpanded ? expandWidth + "px" : "auto"};
  text-align: ${({ isExpanded }) => (isExpanded ? "center" : "start")};
  white-space: ${({ expandWidth, isExpanded }) =>
    isExpanded && expandWidth && expandWidth === 380 ? "wrap" : "nowrap"};
  ${({ isExpanded }) =>
    isExpanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `}

  &:hover {
    background-color: ${tabTheme.backgroundColor.hovered};
  }
`;

export { StyledTab };
