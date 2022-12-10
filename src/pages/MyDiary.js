import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calander from "../components/Calander";
import Diary from "../components/Diary";

// css for components in MyDiary.js
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 100px 0;
  justify-content: center;
`;

const MyDiary = ({ setCurrentTab, userInfo, setUserInfo, isLoggedIn }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setCurrentTab("my-diary");
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
      <Calander date={date} setDate={setDate} />
      <Diary date={date} userInfo={userInfo} setUserInfo={setUserInfo} />
    </Wrapper>
  );
};

export default MyDiary;
