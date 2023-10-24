// TODO: move colors to separate obj suck as tab.styled
import styled, { css } from "styled-components";

import { palette } from "../colors";
import { Directions, ScrollButtonProps } from "../tabs.types";

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconDirections: Record<Directions, string> = {
  [Directions.LEFT]: "-90deg",
  [Directions.RIGHT]: "90deg"
};

const IconWrapper = styled.div`
  width: 40px;
  height: 100px;
  ${flexCenter}
  margin: 4px;
  background: ${palette.darkBlue};
  transition: transform ease-in-out 0.9;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;

const StyledScrollButton = styled.div<ScrollButtonProps>`
  width: 40px;
  height: 100px;
  position: absolute;
  ${flexCenter}
  cursor: pointer;
  visibility: visible;
  z-index: 1000;

  ${({ direction }) => css`
    ${direction}: 0;
  `}

  & svg {
    ${({ direction }: { direction: Directions }) => `transform: rotate(${IconDirections[direction]});`}
  }
`;


export { IconWrapper, StyledScrollButton };
