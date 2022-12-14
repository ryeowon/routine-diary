import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// I used styled components to make easy to use CSS
const Wrapper = styled.div``;

const MainSection = styled.section`
  &:before {
    content: "abc";
    background-color: #000000;
    z-index: -1;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
  }
  position: relative;
  z-index: 1;
  background-image: url("background.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const scrollDown = keyframes`
  0%,20%,50%,80%,100%{
    transform: translateY(0);
  }
  40%{
    transform: translateY(-30px);
  }
  60%{
    transform: translateY(-15px);
  }
`;

const DownArrow = styled.span`
  font-size: 3em;
  color: white;
  position: absolute;
  bottom: 10px;
  //left: 47vw;
  animation: ${scrollDown} 2s ease infinite;
  margin: 0 auto;
  display: block;
`;

const Title = styled.div`
  color: white;
  font-size: 4em;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.span`
  font-weight: 600;
  color: white;
  text-align: center;
  font-size: 1.6em;
  opacity: 0.8;
`;

const Icon = styled.span`
  font-size: 1.2em;
`;

const MainContent = styled.div``;

const Introduce = styled.section`
  height: 45vh;
  background-color: ${(props) => props.color};
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LastSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: black;
  }
`;

const Explanation = styled.div`
  width: 25vw;
  //padding: 0vw;
  h1 {
    font-size: 1.8em;
  }
  p {
    font-size: 1.2em;
  }
`;

const RoutineTable = styled.img`
  height: 30vh;
  margin-left: 3vw;
`;

const RoutineEditor = styled.img`
  height: 40vh;
  margin-right: 10vw;
`;

const Diaries = styled.img`
  height: 38vh;
  margin-right: 3vw;
`;

const StartBtn = styled.button`
  background-color: white;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  min-width: 200px;
  padding: 10px 0;
  margin: 60px auto 0 auto;
  display: block;
  opacity: 0.9;
  font-weight: 600;
  box-shadow: ${(props) => props.theme.btn_shadow};

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
  &:active {
    box-shadow: ${(props) => props.theme.active_shadow};
    transform: translateY(2px);
  }
`;

const RegisterBtn = styled.button`
  background-color: white;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  min-width: 200px;
  padding: 10px 0;
  margin: 60px 1vw;
  opacity: 0.9;
  font-weight: 600;
  background-color: ${(props) => props.theme.dark1};
  box-shadow: ${(props) => props.theme.btn_shadow};

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
  &:active {
    box-shadow: ${(props) => props.theme.active_shadow};
    transform: translateY(2px);
  }
`;

const LoginBtn = styled.button`
  background-color: white;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  min-width: 200px;
  padding: 10px 0;
  margin: 60px 1vw;
  opacity: 0.9;
  font-weight: 600;
  background-color: ${(props) => props.theme.light1};
  box-shadow: ${(props) => props.theme.btn_shadow};

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
  &:active {
    box-shadow: ${(props) => props.theme.active_shadow};
    transform: translateY(2px);
  }
`;
// End of styled components

// Function to render home page
const Home = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MainSection>
        <MainContent>
          <Title>
            <Icon className="material-symbols-outlined">edit_calendar</Icon>
            <span>&nbsp;Routine Diary</span>
          </Title>
          <SubTitle>Enjoy a Regular Life with Your Friends.</SubTitle>
          <StartBtn onClick={() => navigate("/register")}>
            Getting Started
          </StartBtn>
        </MainContent>
        <DownArrow className="material-symbols-outlined">
          keyboard_double_arrow_down
        </DownArrow>
      </MainSection>
      <Introduce>
        <RoutineEditor src="./routine_editor.png" />
        <Explanation>
          <h1>Make your own routine.</h1>
          <p>Set routine name, routine cycle and friends to do with.</p>
        </Explanation>
      </Introduce>
      <Introduce>
        <Explanation>
          <h1>Keep routines with your friends.</h1>
          <p>Check out your friend's achievements in real time.</p>
        </Explanation>
        <RoutineTable src="./routine_table.png" />
      </Introduce>
      <Introduce>
        <Diaries src="./diaries.png" />
        <Explanation>
          <h1>Share Diary with Friends.</h1>
          <p>Share your day and feelings with your friends.</p>
        </Explanation>
      </Introduce>
      <LastSection>
        <Title>
          <Icon className="material-symbols-outlined">edit_calendar</Icon>
          <span>&nbsp;Routine Diary</span>
        </Title>
        <SubTitle>Enjoy a Regular Life with Your Friends.</SubTitle>
        <div>
          <RegisterBtn onClick={() => navigate("/register")}>
            Register
          </RegisterBtn>
          <LoginBtn onClick={() => navigate("/login")}>Login</LoginBtn>
        </div>
      </LastSection>
    </Wrapper>
  );
};

export default Home;
