import { FunctionComponent } from "react";

import ArrowIcon from "./ArrowIcon";
import { ScrollButtonProps } from "../tabs.types";
import { IconWrapper, StyledScrollButton } from "./scrollButton.styled";

const ScrollButton: FunctionComponent<ScrollButtonProps> = ({
  direction,
  isActive,
  onClick,
}) => (
  <StyledScrollButton
    direction={direction}
    isActive={isActive}
    onClick={() => onClick(direction)}
  >
    <IconWrapper>
      <ArrowIcon />
    </IconWrapper>
  </StyledScrollButton>
);

export default ScrollButton;

export { ScrollButton };
