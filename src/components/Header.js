import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: ${(props) => props.theme.small_shadow};
  height: 30px;
  padding: 10px 7vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.light1};
  opacity: 0.9;
  border-bottom: 1px solid lightgray;
`;

const Title = styled(Link)`
  font-weight: bold;
  font-size: x-large;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
  min-width: 300px;
`;

const RightComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Login = styled(Link)`
  margin: 0px 10px;
  width: 100px;
  padding: 7px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.light1};
  cursor: pointer;
  font-weight: 600;

  text-decoration: none;
  color: black;
  font-size: 15px;
  text-align: center;
  font-family: "Raleway", "Courier New", monospace;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px 0px;
  transition: all 0.4s ease;

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
`;

const Register = styled(Link)`
  margin: 0px 10px;
  width: 100px;
  padding: 7px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.dark1};
  cursor: pointer;
  font-weight: 600;

  text-decoration: none;
  color: black;
  font-size: 15px;
  text-align: center;
  font-family: "Raleway", "Courier New", monospace;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px 0px;

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
`;

const CenterComponent = styled.div`
  display: flex;
  margin-left: -40vw;
  align-items: center;
`;

const Tab = styled(Link)`
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.4s ease;
  text-decoration: none;
  color: ${(props) => (props.active ? (props) => props.theme.dark2 : "black")};
  padding: 5px 2vw;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
`;

const Header = ({ isLoggedIn, userInfo, currentTab }) => {
  const [isActive, setIsActive] = useState({
    routine: true,
    diary: false,
    friends: false,
  });

  useEffect(() => {
    if (currentTab === "routine")
      setIsActive({ routine: true, diary: false, friends: false });
    else if (currentTab === "my-diary")
      setIsActive({ routine: false, diary: true, friends: false });
    else if (currentTab === "friends")
      setIsActive({ routine: false, diary: false, friends: true });
  }, [currentTab]);

  return (
    <Wrapper>
      {isLoggedIn ? (
        <Title to="/routine">
          <span className="material-symbols-outlined">edit_calendar</span>
          <span>&nbsp;Routine Diary</span>
        </Title>
      ) : (
        <Title to="/">
          <span className="material-symbols-outlined">edit_calendar</span>
          <span>&nbsp;Routine Diary</span>
        </Title>
      )}

      {isLoggedIn ? (
        <CenterComponent>
          <Tab to="/routine" active={isActive.routine}>
            Routine
          </Tab>
          |
          <Tab to="/my-diary" active={isActive.diary}>
            My Diary
          </Tab>
          |
          <Tab to="/friends" active={isActive.friends}>
            Friends
          </Tab>
        </CenterComponent>
      ) : (
        <></>
      )}

      {isLoggedIn ? (
        <RightComponent>
          <span className="material-symbols-outlined">account_circle</span>
          &nbsp;&nbsp;Hello, {userInfo.username}!
        </RightComponent>
      ) : (
        <RightComponent>
          <Register to="/register">Register</Register>
          <Login to="/login">Log in</Login>
        </RightComponent>
      )}
    </Wrapper>
  );
};

export default Header;
