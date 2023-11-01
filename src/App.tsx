import React from "react";
import styled, { keyframes } from "styled-components";

import { Tape } from "./tabs/tape";
import { palette } from "./tabs/constants";

const gradientAnimation = keyframes`
0% {
    background-position: 0 200%;
  }
  100% {
    background-position: 0 -200%;
  }
`;

const AppWrapper = styled.div`
  background: radial-gradient(circle, #f73261, #5e35b0);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  height: 100vh;
`;

const PageWrapper = styled.div`
  padding: 0 50px;
  position: relative;
  top: 60px;
  max-width: 1000px;
  min-width: 800px;
  height: 120px;
  background-color: ${palette.darkBlue};
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const tabs = [
  {
    label:
      "FIRST lllllll lllllll lllllll lllllll lllllll lllllll llllllllllllll lllllll",
    id: "1",
  },
  {
    label:
      "lllllll lllllll lllllll lllllll lllllll lllllll lllllll llllllllllllll lllllll lllllll",
    id: "2",
  },
  {
    label:
      "LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL THE END",
    id: "3",
  },
  {
    label:
      "LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL THE END LLLLLLLLLLLLLLLLLLLLLLLLLLLL",
    id: "4",
  },
  { label: "short tab", id: "5" },
  { label: "short tab", id: "6" },
  { label: "short tab tabbb", id: "7" },
  {
    label:
      "tab with a lot of small words inside of it bla bla bla bla bla bla bla bla bla bla la bla bla bla bla bla bla bla bla yey",
    id: "8",
  },
  {
    label:
      "tab with a lot of small words inside of it bla bla bla bla bla bla bla bla bla bla la bla bla bla bla bla bla bla bla yey",
    id: "9",
  },
  {
    label:
      "tab with a lot of small words inside of it bla bla bla bla bla bla bla bla bla bla la bla bla bla bla bla bla bla bla yey",
    id: "10",
  },
];

const App = () => {
  return (
    <AppWrapper>
      <PageWrapper>
        <Tape tabs={tabs} />
      </PageWrapper>
    </AppWrapper>
  );
};

export default App;
