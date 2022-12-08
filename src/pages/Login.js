import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// css for components in Register.js
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 50px 0;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
  margin: 10px;
`;

const InputWrapper = styled.div`
  margin-top: 20px;
`;
const Input = styled.input`
  max-width: 500px;
  min-width: 300px;
  width: 25vw;
  height: 22px;
  margin: 2px 0;
  border-radius: 5px;
  border: 1px solid black;
  padding: 4px 10px;

  &:focus {
    outline: none;
  }

  font-family: "Raleway", "Courier New", monospace;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  margin: 40px;
  height: 37px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.dark1};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }

  &:disabled {
    background-color: lightgray;
    cursor: default;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.dark2};
  font-weight: bold;
  word-break: break-word;
  max-width: 500px;
  min-width: 300px;
  width: 25vw;
`;
// End of css

// register page
const Login = () => {
  // state variables
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const [isAllValid, setIsAllValid] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    console.log(isValid);
    // if all input values are valid, set isAllValid to true and enable the register button.
    if (isValid.email && isValid.password) {
      console.log("true");
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
    console.log(isValid);
  }, [errorMsg]);

  // function to check if the input values are valid.
  const onInputChange = (e) => {
    if (e.target.name === "email") {
      let reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      let email = e.target.value;

      if (reg.test(email)) {
        isValid.email = true;
        setErrorMsg((prevState) => {
          return { ...prevState, email: "" };
        });
      } else {
        isValid.email = false;
        setErrorMsg((prevState) => {
          return { ...prevState, email: "*Your email is invalid." };
        });
      }
    } else if (e.target.name === "password") {
      if (e.target.value.length > 7) {
        isValid.password = true;
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password: "",
          };
        });
      } else {
        isValid.password = false;
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password: "*Password should be longer than 7 characters.",
          };
        });
      }
    }

    //console.log(errorMsg);
  };
  const navigate = useNavigate();
  const onBtnClick = () => {
    navigate("/routine");
  };

  return (
    <Wrapper>
      <Container>
        <Title>Login</Title>
        <div>
          Don't have an account? <Link to="/login">Register</Link>
        </div>
        <InputWrapper>
          <div>Email</div>
          <Input name="email" type="email" onChange={onInputChange} />
          <ErrorMessage>{errorMsg.email}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <div>Password</div>
          <Input name="password" type="password" onChange={onInputChange} />
          <ErrorMessage>{errorMsg.password}</ErrorMessage>
        </InputWrapper>
        <Button disabled={!isAllValid} onClick={onBtnClick}>
          Login
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Login;
