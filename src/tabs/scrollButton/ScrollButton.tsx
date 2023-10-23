import { FunctionComponent } from "react";

import ArrowIcon from "./ArrowIcon";
import { ScrollButtonProps } from "../tabs.types";
import { IconWrapper, StyledScrollButton } from "./scrollButton.styled";

const ScrollButton: FunctionComponent<ScrollButtonProps> = ({
  direction,
  isVisible,
  onClick,
}) => (
  <StyledScrollButton
    direction={direction}
    isVisible={isVisible}
    onClick={() => onClick(direction)}
  >
    <IconWrapper>
      <ArrowIcon />
    </IconWrapper>
  </StyledScrollButton>
);

export default ScrollButton;

export { ScrollButton };
