import styled, { css } from "styled-components";

import { palette } from "../colors";
import { StyledScrollButton } from "../scrollButton/scrollButton.styled";

const flexCenterStart = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledWrapper = styled.div`
  ${flexCenterStart}
  position: relative;
  transition: transform ease-in-out 0.3s;
`;

const StyledTape = styled.div`
  ${flexCenterStart}
  position: relative;
  overflow: hidden;
  min-height: 64px;
  max-height: 100px;
  padding-left: 16px;

  ${StyledScrollButton} {
    display: none;
  }

  &:hover ${StyledScrollButton} {
    display: flex;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: 20px;
    height: 64px;
    pointer-events: none;
    background: linear-gradient(to left, ${palette.white}, transparent);
  }
`;

export { StyledTape, StyledWrapper };
