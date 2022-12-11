import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calander from "../components/Calander";
import Diary from "../components/Diary";

// I used styled components to make easy to use CSS
const Wrapper = styled.div`
  //width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 100px 0;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    padding: 80px 4vw;
    flex-direction: column;
    align-items: center;
  }
`;
// End of styled components

// Function to render user's diary
const MyDiary = ({ setCurrentTab, userInfo, setUserInfo, isLoggedIn }) => {
  const [date, setDate] = useState(new Date());

  // set current tab to my-diary to change color of my-diary tab.
  useEffect(() => {
    setCurrentTab("my-diary");
  }, []);

  const navigate = useNavigate();

  // if user is not logged in, go to the main page.
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
