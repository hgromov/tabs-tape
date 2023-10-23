import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Tab } from "../tab";
import { ScrollButton } from "../scrollButton";
import { TapeProps, ScrollDirections } from "../tabs.types";
import { StyledTape, StyledWrapper } from "./tape.styled";

const TAB_MARGIN = 8;
const TAB_BORDER = 1;
const TAB_MARGINS = TAB_MARGIN * 2;
const TAB_BORDERS = TAB_BORDER * 2;
const TAB_GAP = 44;
const TAB_EXPANSION = 80;

const Tape: FunctionComponent<TapeProps> = ({
  tabs,
  selectedTabId = "",
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // *scrollLeft is negative value which represents scroll from left.
  // this is the main value used for scroll. changing it we can scroll the tape using transform translate in useLayoutEffect below.
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLastElementOverflowing, setIsLastElementOverflowing] =
    useState(false);
  const tapeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // This useLayoutEffect manages scrolling behavior of the "tape" within the "container" element.
  useLayoutEffect(() => {
    const tape = tapeRef.current;
    const container = containerRef.current;
    if (tape && container) {
      // Here we have tape (strip of tabs) and if contains more tabs then container (visible area) can fill, then we can scroll it conditionally.
      const containerWidth = container.clientWidth;
      const tapeWidth = tape.getBoundingClientRect().width;

      const isScrollable = tapeWidth > containerWidth;

      // If we already reached the end of the tape, we should not show the right, logic for canScrollLeft is pretty simple because we have scrollLeft value.
      setCanScrollLeft(isScrollable && scrollLeft < 0);
      // Here I say tapeWidth + scrollLeft > containerWidth (that means, if difference between tapeWidth and scrollLeft more then containerWidth then we can scroll).
      // but there is one edge case, when the last element is overflowing, then i compare this not to containerWidth, but to containerWidth + difference between normal tab and extended one (TAB_EXPANSION).
      setCanScrollRight(
        isScrollable &&
          tapeWidth + scrollLeft >
            containerWidth + (isLastElementOverflowing ? TAB_EXPANSION : 0)
      );

      tape.style.transform = `translateX(${scrollLeft}px)`;
    }
  }, [isLastElementOverflowing, scrollLeft]);

  useEffect(() => {
    if (selectedTabId) {
      const selectedTabIndex = tabs.findIndex(
        (chip) => chip.id === selectedTabId
      );
      scrollHandler(selectedTabIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTab = (data: any, index: number) => {
    const handleClick = () => {
      if (canScrollLeft || canScrollRight) scrollHandler(index);
    };

    return (
      <Tab
        isSelected={data.id === selectedTabId}
        key={data.label + data.id}
        onClick={handleClick}
        text={data.label}
      />
    );
  };

  const getEntireTabWidth = (tab: HTMLElement) =>
    tab.getBoundingClientRect().width + TAB_MARGIN;

  const scrollHandler = (direction: ScrollDirections | number) => {
    const tape = tapeRef.current;
    const container = containerRef.current;
    if (tape && container) {
      const tapeWidth = tape.getBoundingClientRect().width;
      const containerWidth = container.clientWidth;
      const tabs = Array.from(tape.children) as HTMLElement[];
      let visibleWidth = 0;
      let targetTabIndex = 0;

      // scrolling to particular tab
      if (typeof direction === "number") {
        // Here we have 3 cases: isFirstTab, isTabFullyVisibleFromRight, or the target tab somewhere in the middle.

        // If first tab was clicked, we just set scrollLeft to zero, that brings us at the start of the tape.
        const isFirstTab = direction === 0;
        if (isFirstTab) {
          return setScrollLeft(0);
        }

        let visibleWidthfromRight = 0;
        for (let i = tabs.length - 1; i >= direction; i--) {
          visibleWidthfromRight += getEntireTabWidth(tabs[i]);
        }

        // If the one of last tabs was clicked, we need to scroll at the end of tape, so we take tapeWidth - containerWidth
        // and at this point we have to reverse it to negative to set it as the scrollLeft, accounting TAB_GAP and TAB_EXPANSION to make it fully visible.
        if (containerWidth > visibleWidthfromRight) {
          return setScrollLeft(
            -(
              tapeWidth -
              containerWidth +
              TAB_MARGINS +
              (isLastElementOverflowing ? TAB_EXPANSION : 0)
            )
          );
        }

        // Othervise we find the sum of the tab widths before the direction tab
        for (let i = 0; i < direction; i++) {
          visibleWidth += getEntireTabWidth(tabs[i]); // Include the tab's width and margin.
        }

        // And setting it's sum turned to negative as a scrollLeft value including some extra space before for conveniance.
        setScrollLeft(-visibleWidth + TAB_GAP);
      }

      if (direction === ScrollDirections.LEFT) {
        /*
          'scrollRight' represents the difference between the right edge of the container (visible area),
          and the right edge of the entire tape, including elements beyond the visible area.
        */
        const scrollRight = tapeWidth - -scrollLeft - containerWidth;

        // Find the index of the previous tab that doesn't fully fit inside the container.
        for (let i = tabs.length - 1; i >= 0; i--) {
          visibleWidth += getEntireTabWidth(tabs[i]); // Include the tab's width and margin.
          if (visibleWidth > containerWidth + scrollRight) {
            targetTabIndex = i;
            break; // Stop the loop as we've found the previous tab index.
          }
        }

        // Calculate the width of cropped part tab to scroll back to make the left tab fully visible.
        let stepWidth =
          visibleWidth - containerWidth - scrollRight - TAB_MARGIN;

        /*
          When the last visible tab from left perfectly aligns with the left edge of the container,
          the 'stepWidth' becomes very close to zero or zero itself.
          This happens when 'visibleWidth' is equal to 'containerWidth' + 'scrollRight' + 8px of margin
          Then, instead of looking for the width of the cropped part of the tab, we take the previous one and scroll it by its width.
        */
        if (targetTabIndex && stepWidth < 1) {
          stepWidth =
            tabs[targetTabIndex - 1].getBoundingClientRect().width + TAB_MARGIN;
        }

        /*
          If 'scrollLeft' + 'stepWidth' equals -8 or less, it means the tape has reached the beginning,
          and there are no more tabs before. In this case, set 'scrollLeft' to 0 to prevent further scrolling to the left.
          Otherwise, continue scrolling to the left by adding 'stepWidth' to 'prevScrollLeft'.
        */
        const reachedBeginning =
          scrollLeft + stepWidth >= -(TAB_MARGIN + TAB_BORDERS);

        setScrollLeft((prevScrollLeft) =>
          reachedBeginning ? 0 : prevScrollLeft + stepWidth
        );
      }

      if (direction === ScrollDirections.RIGHT) {
        // Find the index of the next tab that doesn't fully fit inside the container.
        for (let i = 0; i < tabs.length; i++) {
          visibleWidth += getEntireTabWidth(tabs[i]); // Include the tab's width and margin.
          if (visibleWidth > containerWidth + -scrollLeft) {
            targetTabIndex = i;
            break; // Stop the loop as we've found the next tab index.
          }
        }

        // Calculate the width of scroll right step to make the next tab fully visible including margins and borders.
        const stepWidth =
          visibleWidth -
          containerWidth +
          scrollLeft +
          TAB_MARGINS +
          TAB_BORDERS;

        setScrollLeft((prevScrollLeft) => prevScrollLeft - stepWidth);
      }
    }
  };

  return (
    <StyledTape ref={containerRef}>
      <ScrollButton
        direction={ScrollDirections.LEFT}
        isVisible={canScrollLeft}
        onClick={scrollHandler}
      />
      <StyledWrapper ref={tapeRef}>
        {tabs.map(renderTab)}
      </StyledWrapper>
      <ScrollButton
        direction={ScrollDirections.RIGHT}
        isVisible={canScrollRight}
        onClick={scrollHandler}
      />
    </StyledTape>
  );
};

export default Tape;

export { Tape };
