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

  overflow-y: scroll;
  height: 100%;
  position: relative;

  @media only screen and (max-width: 768px) {
    padding: 80px 4vw;
    flex-direction: column;
    align-items: center;
  }
`;

const Routine = ({ setCurrentTab, isLoggedIn, userInfo, setUserInfo }) => {
  const [routineNum, setRoutineNum] = useState("new");
  const [isEdit, setIsEdit] = useState(false);
  const [routineList, setRoutineList] = useState({});

  useEffect(() => {
    setCurrentTab("routine");
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Wrapper>
      <RoutineTable
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setIsEdit={setIsEdit}
        setRoutineNum={setRoutineNum}
        routineList={routineList}
        setRoutineList={setRoutineList}
      />
      {isEdit ? (
        <RoutineEditor
          routineNum={routineNum}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setIsEdit={setIsEdit}
          routineList={routineList}
          setRoutineList={setRoutineList}
        />
      ) : null}
    </Wrapper>
  );
};

export default Routine;
