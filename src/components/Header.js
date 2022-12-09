import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  box-shadow: 0px 5px 10px ${(props) => props.theme.light1};
  height: 30px;
  padding: 10px 7vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  transition: all 0.4s ease;

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
  color: black;
  padding: 5px 2vw;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
`;

const Header = ({ isLoggedIn, userInfo }) => {
  return (
    <Wrapper>
      <Title to="/">
        <span className="material-symbols-outlined">date_range</span>
        <span>&nbsp;Routine Diary</span>
      </Title>
      {isLoggedIn ? (
        <CenterComponent>
          <Tab to="/routine">Routine</Tab> | <Tab to="/my-diary">My Diary</Tab>|
          <Tab to="/friends">Friends</Tab>
        </CenterComponent>
      ) : (
        <></>
      )}

      {isLoggedIn ? (
        <RightComponent>
          <span class="material-symbols-outlined">account_circle</span>
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
