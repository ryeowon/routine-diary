import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// styled components for Home.js
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

const SubTitle = styled.div`
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

const Home = () => {
  return (
    <Wrapper>
      <MainSection>
        <MainContent>
          <Title>
            <Icon className="material-symbols-outlined">edit_calendar</Icon>
            &nbsp;Routine Diary
          </Title>
          <SubTitle>Enjoy a Regular Life with Your Friends.</SubTitle>
          <StartBtn>Getting Started</StartBtn>
        </MainContent>
        <DownArrow className="material-symbols-outlined">
          keyboard_double_arrow_down
        </DownArrow>
      </MainSection>
    </Wrapper>
  );
};

export default Home;
