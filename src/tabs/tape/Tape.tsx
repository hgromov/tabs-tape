import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Tab } from "../tab";
import { TAB_MARGIN } from "../constants";
import { ScrollButton } from "../scrollButton";
import { TapeProps, Directions } from "../tabs.types";
import { StyledTape, StyledWrapper } from "./tape.styled";

const Tape: FunctionComponent<TapeProps> = ({ tabs }) => {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(true);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const [scrollRightPoints, setScrollRightPoints] = useState<number[]>([]);
  const [scrollLeftPoints, setScrollLeftPoints] = useState<number[]>([]);
  const [scrollMiddlePoints, setScrollMiddlePoints] = useState<
    { index: number; point: number }[]
  >([]);

  const [translateX, setTranslateX] = useState<number>(0);

  const tapeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanScrollLeft(!(translateX === 0));
    setCanScrollRight(
      !(
        translateX - TAB_MARGIN ===
        -scrollRightPoints[scrollRightPoints.length - 1]
      )
    );
  }, [translateX, scrollRightPoints, scrollLeftPoints]);

  useLayoutEffect(() => {
    const tape = tapeRef.current;
    const container = containerRef.current;
    if (!tape || !container) return;

    const containerWidth = container.clientWidth;
    const tapeWidth = tape.getBoundingClientRect().width;

    const tabsArray = Array.from(tape.children) as HTMLElement[];

    const navigationPoints = tabsArray.reduce(
      (
        acc: {
          rightPoints: number[];
          leftPoints: number[];
          middlePoints: { index: number; point: number }[];
          stepWidth: number;
        },
        tab: HTMLElement,
        index
      ) => {
        const tabWidth = getEntireTabWidth(tab);
        // for first tabs
        if (acc.stepWidth < containerWidth / 2) {
          acc.middlePoints.push({
            index,
            point: TAB_MARGIN,
          });
        }
        // for tabs in the end
        if (tabWidth + acc.stepWidth > tapeWidth - containerWidth / 2) {
          acc.middlePoints.push({
            index,
            point: tapeWidth - containerWidth,
          }); // for tabs in the middle
        } else if (acc.stepWidth > containerWidth / 2) {
          acc.middlePoints.push({
            index,
            point: acc.stepWidth - (containerWidth - tabWidth) / 2,
          });
        }

        acc.stepWidth += tabWidth;
        if (acc.stepWidth > containerWidth) {
          acc.rightPoints.push(acc.stepWidth - containerWidth);
        }
        acc.leftPoints.unshift(acc.stepWidth);
        return acc;
      },
      {
        rightPoints: [],
        middlePoints: [],
        leftPoints: [0],
        stepWidth: 0,
      }
    );

    setScrollLeftPoints(
      navigationPoints.leftPoints.filter(
        (point) =>
          point <=
          navigationPoints.rightPoints[navigationPoints.rightPoints.length - 1]
      )
    );
    setScrollRightPoints(navigationPoints.rightPoints);
    setScrollMiddlePoints(navigationPoints.middlePoints);
  }, [tabs]);

  const renderTab = (tabData: any, index: number) => {
    const handleClick = () => {
      if (canScrollLeft || canScrollRight) scrollHandler(index);
      setSelectedTabId(tabData.id);
    };

    return (
      <Tab
        isSelected={tabData.id === selectedTabId}
        key={tabData.label + tabData.id}
        onClick={handleClick}
        text={tabData.label}
      />
    );
  };

  const getEntireTabWidth = (tab: HTMLElement) =>
    tab.getBoundingClientRect().width + TAB_MARGIN;

  const scrollHandler = (direction: Directions | number) => {
    if (direction === Directions.RIGHT) {
      const brakePoint = scrollRightPoints.find(
        (point) => point > -translateX + TAB_MARGIN
      );
      typeof brakePoint === "number" && setTranslateX(-brakePoint + TAB_MARGIN);
    }

    if (direction === Directions.LEFT) {
      const brakePoint = scrollLeftPoints.find((point) => point < -translateX);
      typeof brakePoint === "number" && setTranslateX(-brakePoint);
    }

    if (typeof direction === "number") {
      const brakePoint = scrollMiddlePoints.find(
        (point) => point.index === direction
      );

      console.log({ brakePoint });

      typeof brakePoint?.point === "number" &&
        setTranslateX(-brakePoint.point + TAB_MARGIN);
    }
  };

  return (
    <StyledTape ref={containerRef}>
      <StyledWrapper ref={tapeRef} translateX={translateX}>
        {tabs.map(renderTab)}
      </StyledWrapper>
      <ScrollButton
        direction={Directions.LEFT}
        isActive={canScrollLeft}
        onClick={scrollHandler}
      />
      <ScrollButton
        direction={Directions.RIGHT}
        isActive={canScrollRight}
        onClick={scrollHandler}
      />
    </StyledTape>
  );
};

export default Tape;

export { Tape };
