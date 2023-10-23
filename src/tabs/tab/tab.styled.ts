import styled from "styled-components";

import { tabTheme } from "../colors";
import { StyledTabProps } from "../tabs.types";

const COLLAPSED_TAB_HEIGHT = 40;

const StyledTab = styled.div<StyledTabProps>`
  box-sizing: border-box;
  background-color: ${({ isSelected }) =>
    isSelected
      ? tabTheme.backgroundColor.hovered
      : tabTheme.backgroundColor.primary};
  margin-right: 8px;
  color: ${({ isSelected }) =>
    isSelected ? tabTheme.color.selected : tabTheme.color.default};
  font-size: 14px;
  line-height: 24px;
  min-height: ${({ expandHeight, isExpanded }) =>
    isExpanded ? expandHeight + "px" : "40px"};
  max-height: ${({ expandHeight, isExpanded }) =>
    isExpanded ? expandHeight + "px" : "40px"};
  max-width: ${({ isExpanded }) => (isExpanded ? "380px" : "300px")};
  min-width: ${({ expandWidth, isExpanded }) =>
    isExpanded ? expandWidth + "px" : "auto"};
  text-align: ${({ isExpanded }) => (isExpanded ? "center" : "start")};
  border-radius: 100px;
  font-weight: 600;
  padding: ${({ expandHeight, isExpanded }) =>
      isExpanded && expandHeight && expandHeight > COLLAPSED_TAB_HEIGHT
        ? "4px"
        : "6px"}
    16px;
  border: 1px solid ${tabTheme.borderColor};
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ isExpanded }) =>
    isExpanded &&
    `
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  `}
  white-space: ${({ expandWidth, isExpanded }) =>
    isExpanded && expandWidth && expandWidth === 380 ? "wrap" : "nowrap"};
  transition: all ease-in-out 0.3s;
  user-select: none;

  &:hover {
    background-color: ${tabTheme.backgroundColor.hovered};
    cursor: pointer;
    color: ${tabTheme.color.selected};
  }
`;

export { StyledTab };
