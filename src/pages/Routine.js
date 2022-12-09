import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoutineEditor from "../components/RoutineEditor";
import RoutineTable from "../components/RoutineTable";

// css for components in Routine.js
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  padding: 80px ${(props) => props.theme.wrapper_padding};
`;

const Routine = ({ setCurrentTab }) => {
  const [isNew, setisNew] = useState(true);

  useEffect(() => {
    setCurrentTab("routine");
  });

  return (
    <Wrapper>
      <RoutineTable />
      <RoutineEditor isNew={isNew} />
    </Wrapper>
  );
};

export default Routine;
