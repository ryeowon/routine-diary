import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoutineTable from "../components/RoutineTable";

// css for components in Routine.js
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 ${(props) => props.theme.wrapper_padding};
  justify-content: center;
`;

const Routine = () => {
  return (
    <Wrapper>
      <RoutineTable />
    </Wrapper>
  );
};

export default Routine;
