import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoutineEditor from "../components/RoutineEditor";
import RoutineTable from "../components/RoutineTable";

// I used styled components to make easy to use CSS
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
// End of styled components

// Function to render routine page
const Routine = ({ setCurrentTab, isLoggedIn, userInfo, setUserInfo }) => {
  const [routineNum, setRoutineNum] = useState("new");
  const [isEdit, setIsEdit] = useState(false);
  const [routineList, setRoutineList] = useState({});

  // set current tab to routine to change color of routine tab.
  useEffect(() => {
    setCurrentTab("routine");
  });

  const navigate = useNavigate();

  // if user is not logged in, go to the main page.
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
