import React from "react";
import styled from "styled-components";

import { Tape } from "./tabs/tape";

const AppWrapper = styled.div`
  background-color: #d3d3d3;
  height: 100vw;
  padding-top: 60px;
`;

const PageWrapper = styled.div`
  max-width: 800px;
  min-width: 600px;
  height: 120px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const tabs = [
  { label: "first tab", id: "1" },
  {
    label:
      "LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL THE END",
    id: "2",
  },
  {
    label:
      "LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL LLLLLLL THE END LLLLLLLLLLLLLLLLLLLLLLLLLLLL",
    id: "3",
  },
  {
    label:
      "lllllll lllllll lllllll lllllll lllllll lllllll lllllll llllllllllllll lllllll lllllll lllllll lllllll",
    id: "4",
  },
  { label: "short tab", id: "5" },
  { label: "short tab", id: "6" },
  { label: "short tab", id: "7" },
  {
    label:
      "tab with a lot of small words inside of it bla bla bla bla bla bla bla bla bla bla la bla bla bla bla bla bla bla bla yey",
    id: "8",
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
