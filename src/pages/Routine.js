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

const Routine = ({ setCurrentTab, isLoggedIn, userInfo, setUserInfo }) => {
  const [isNew, setisNew] = useState(true);

  useEffect(() => {
    setCurrentTab("routine");
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Wrapper>
      <RoutineTable userInfo={userInfo} />
      <RoutineEditor
        isNew={isNew}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </Wrapper>
  );
};

export default Routine;
