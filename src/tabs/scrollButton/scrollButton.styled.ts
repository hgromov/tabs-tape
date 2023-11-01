import styled, { css } from "styled-components";

import { palette } from "../constants";
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
`;

const StyledScrollButton = styled.div<ScrollButtonProps>`
  width: 40px;
  height: 120px;
  position: absolute;
  ${flexCenter}
  cursor: pointer;
  visibility: visible;
  z-index: 1000;

  ${({isActive}) => !isActive ? "background: #061c40; cursor: default;" : ""}

  ${({ direction }) => css`
    ${direction}: 0;
  `}

  & svg {
    ${({ direction }: { direction: Directions }) => `transform: rotate(${IconDirections[direction]});`}
  }
`;


export { IconWrapper, StyledScrollButton };
