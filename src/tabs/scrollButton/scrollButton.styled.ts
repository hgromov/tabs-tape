// TODO: move colors to separate obj suck as tab.styled
import styled, { css } from "styled-components";

import { palette } from "../colors";
import { ScrollButtonProps, ScrollDirections } from "../tabs.types";

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconDirections: Record<ScrollDirections, string> = {
  [ScrollDirections.LEFT]: "-90deg",
  [ScrollDirections.RIGHT]: "90deg"
};

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  ${flexCenter}
  margin: 4px;
  background: ${palette.white};
  border-radius: 50%;
  box-shadow: 0px 0px 4px 0px ${palette.lightGray};
`;

const StyledScrollButton = styled.div<ScrollButtonProps>`
  width: 72px;
  height: 64px;
  position: absolute;
  ${flexCenter}
  cursor: pointer;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  z-index: 1000;

  ${({ direction }) => css`
    ${direction}: 0;
    background: linear-gradient(to ${direction}, transparent, ${palette.white} 30%);
  `}

  & svg {
    ${({ direction }: { direction: ScrollDirections }) => `transform: rotate(${IconDirections[direction]});`}
  }
`;


export { IconWrapper, StyledScrollButton };
