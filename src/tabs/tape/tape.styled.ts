import styled, { css } from "styled-components";

const flexCenterStart = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledWrapper = styled.div<{translateX: number}>`
  ${flexCenterStart}
  position: relative;
  transition: transform ease-in-out 0.3s;
  transform: translateX(${({translateX}) => translateX + "px"});
`;

const StyledTape = styled.div`
  ${flexCenterStart}
  overflow: hidden;
  min-height: 64px;
  max-height: 100px;
`;

export { StyledTape, StyledWrapper };
