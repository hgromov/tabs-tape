enum ScrollDirections {
  LEFT = "left",
  RIGHT = "right",
}

type TapeProps = {
  tabs: { label: string; id: string }[];
  selectedTabId?: string;
};

type ScrollButtonProps = {
  direction: ScrollDirections;
  isVisible: boolean;
  onClick: (direction: ScrollDirections) => void;
};

type TabProps = {
  isSelected?: boolean;
  onClick?: () => void;
  text: string;
};

interface SvgProps {
  color?: string;
  height?: string | number;
  opacity?: string;
  onClick?: VoidFunction;
  width?: string | number;
}

interface StyledTabProps {
  expandHeight?: number;
  expandWidth?: number;
  isExpanded?: boolean;
  isSelected?: boolean;
}

export { ScrollDirections };

export type { TabProps, StyledTabProps, SvgProps, TapeProps, ScrollButtonProps };
