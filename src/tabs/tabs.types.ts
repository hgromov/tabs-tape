enum Directions {
  LEFT = "left",
  RIGHT = "right",
}

type TapeProps = {
  tabs: { label: string; id: string }[];
};

type ScrollButtonProps = {
  direction: Directions;
  isActive?: boolean;
  onClick: (direction: Directions) => void;
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

export { Directions };

export type { TabProps, StyledTabProps, SvgProps, TapeProps, ScrollButtonProps };
