import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  box-shadow: 0px 5px 10px ${(props) => props.theme.light1};
  height: 30px;
  padding: 10px 100px;
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

  &:hover {
    background-color: ${(props) => props.theme.dark0};
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

  &:hover {
    background-color: ${(props) => props.theme.dark0};
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Title to="/">
        <span className="material-symbols-outlined">date_range</span>
        <span>Routine Diary</span>
      </Title>
      <RightComponent>
        <Register to="/register">Register</Register>
        <Login to="/login">Log in</Login>
      </RightComponent>
    </Wrapper>
  );
};

export default Header;
