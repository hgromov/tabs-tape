import { useClickAway } from "react-use";
import { FunctionComponent, useLayoutEffect, useRef, useState } from "react";

import { StyledTab } from "./tab.styled";
import { TabProps } from "../tabs.types";

const BASE_TAB_HEIGHT = 40;
const MAX_COLLAPSED_TAB_WIDTH = 300;
const MAX_EXPANDED_TAB_WIDTH = 380;
const TAB_PADDING = 16;
const TAB_PADDINGS = TAB_PADDING * 2;
const DEFAULT_LINES_AMOUNT = 1;
const LINE_HEIGHT = 28;
const MAXIMUM_LINES = 3;

const Tab: FunctionComponent<TabProps> = ({ onClick, text, isSelected }) => {
  const [isTextOverflowing, setIsTextOverflowing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [expandWidth, setExpandWidth] = useState<number>(
    MAX_COLLAPSED_TAB_WIDTH
  );
  const [expandHeight, setExpandHeight] = useState<number>(BASE_TAB_HEIGHT);

  const tabRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = tabRef.current;
    if (!container) return;
    if (container.clientWidth < container.scrollWidth) {
      setIsTextOverflowing(true);
      let width = MAX_COLLAPSED_TAB_WIDTH;
      let height = BASE_TAB_HEIGHT;
      let lines = DEFAULT_LINES_AMOUNT;

      if (container.scrollWidth > MAX_EXPANDED_TAB_WIDTH) {
        lines = Math.ceil(
          container.scrollWidth / (MAX_EXPANDED_TAB_WIDTH - TAB_PADDINGS)
        );
        height = Math.min(lines, MAXIMUM_LINES) * LINE_HEIGHT;
        width = MAX_EXPANDED_TAB_WIDTH;
      } else {
        width = container.scrollWidth;
      }

      setExpandWidth(width);
      setExpandHeight(height);
    }
  }, [tabRef, text, isExpanded]);

  useClickAway(tabRef, () => {
    setIsExpanded(false);
  });

  const toggleExpansion = () => {
    if (isTextOverflowing) {
      setIsExpanded((isExpanded) => !isExpanded);
    }
  };

  const handleClick = () => {
    if (isSelected) toggleExpansion();

    onClick && onClick();
  };

  return (
    <StyledTab
      expandHeight={expandHeight}
      expandWidth={expandWidth}
      isExpanded={isTextOverflowing && isExpanded}
      isSelected={isSelected}
      onClick={handleClick}
      ref={tabRef}
    >
      {text}
    </StyledTab>
  );
};

export default Tab;

export { Tab };
