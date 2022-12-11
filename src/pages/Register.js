import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";

// I used styled components to make easy to use CSS
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 100px 0;
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
// End of styled components

// Function to render register page
const Register = () => {
  // state variables
  const [isValid, setIsValid] = useState({
    username: false,
    id: false,
    password: false,
    password_confirmation: false,
  });

  const [accountInfo, setAccountInfo] = useState({
    username: "",
    id: "",
    password: "",
    password_confirmation: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    username: "",
    id: "",
    password: "",
    password_confirmation: "",
  });

  const [isAllValid, setIsAllValid] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    // if all input values are valid, set isAllValid to true and enable the register button.
    if (
      isValid.username &&
      isValid.id &&
      isValid.password &&
      isValid.password_confirmation
    ) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [errorMsg]);

  // function to check if the input values are valid.
  const onInputChange = (e) => {
    if (e.target.name === "name") {
      isValid.username = false;
      if (e.target.value) {
        accountInfo.username = e.target.value;
        isValid.username = true;
        setErrorMsg((prevState) => {
          return { ...prevState, name: "" };
        });
      } else {
        setErrorMsg((prevState) => {
          return { ...prevState, name: "*Please enter your name." };
        });
      }
    } else if (e.target.name === "id") {
      isValid.id = false;
      let id = e.target.value;

      // check id
      if (!id.match(/[^A-Za-z0-9]+/g)) {
        isValid.id = true;
        accountInfo.id = id;
        setErrorMsg((prevState) => {
          return { ...prevState, id: "" };
        });
      } else {
        accountInfo.id = "";
        setErrorMsg((prevState) => {
          return { ...prevState, id: "*You cannot use special characters." };
        });
      }
    } else if (e.target.name === "password") {
      isValid.password = false;
      //check password
      let password = e.target.value;
      if (password.length < 8) {
        accountInfo.password = "";
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password: "*Password has to be more than 7 characters.",
          };
        });
      } else if (
        !/[0-9]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        accountInfo.password = "";
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password:
              "*password must contain at least one capital letter, one lowercase letter, and one digit!",
          };
        });
      } else if (
        !password.match(/[!?@#$%^&*():;+\-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/)
      ) {
        accountInfo.password = "";
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password: "*password must contain at least one special character!",
          };
        });
      } else {
        accountInfo.password = password;
        isValid.password = true;
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password: "",
          };
        });
        if (accountInfo.password_confirmation !== password) {
          isValid.password_confirmation = false;
          setErrorMsg((prevState) => {
            return {
              ...prevState,
              password_confirmation: "*Password does not match.",
            };
          });
        } else {
          isValid.password_confirmation = true;
          setErrorMsg((prevState) => {
            return {
              ...prevState,
              password_confirmation: "",
            };
          });
        }
      }
    } else if (e.target.name === "password_confirmation") {
      // check password confirmation
      if (accountInfo.password) {
        isValid.password_confirmation = false;
        if (accountInfo.password === e.target.value) {
          isValid.password_confirmation = true;
          accountInfo.password_confirmation = e.target.value;
          setErrorMsg((prevState) => {
            return {
              ...prevState,
              password_confirmation: "",
            };
          });
        } else {
          setErrorMsg((prevState) => {
            return {
              ...prevState,
              password_confirmation: "*Password does not match.",
            };
          });
        }
      } else {
        setErrorMsg((prevState) => {
          return {
            ...prevState,
            password_confirmation: "*Please enter valid password.",
          };
        });
      }
    }
  };

  const onBtnClick = () => {
    const db = getDatabase();
    const idRef = query(ref(db, "/users"), orderByChild("id"));

    const userRef = query(idRef, equalTo(accountInfo.id));

    // if email is unique, save account information to database.
    // if not, show error message.
    onValue(
      userRef,
      (snapshot) => {
        console.log("snapshot val", snapshot.val());
        if (snapshot.val()) {
          setErrorMsg((prevState) => {
            return { ...prevState, id: "*Your id is duplicated." };
          });
        } else {
          console.log("success");
          setIsCreated(true);
          set(ref(db, "users/" + accountInfo.id), accountInfo);
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      {!isCreated ? (
        <Container>
          <Title>Register</Title>
          <div>
            Have an account? <Link to="/login">Login</Link>
          </div>
          <InputWrapper>
            <div>Name</div>
            <Input name="name" onChange={onInputChange} />
            <ErrorMessage>{errorMsg.name}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <div>ID</div>
            <Input name="id" type="id" onChange={onInputChange} />
            <ErrorMessage>{errorMsg.id}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <div>Password</div>
            <Input name="password" type="password" onChange={onInputChange} />
            <ErrorMessage>{errorMsg.password}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <div>Confirm Password</div>
            <Input
              name="password_confirmation"
              type="password"
              onChange={onInputChange}
            />
            <ErrorMessage>{errorMsg.password_confirmation}</ErrorMessage>
          </InputWrapper>
          <Button disabled={!isAllValid} onClick={onBtnClick}>
            Create Account
          </Button>
        </Container>
      ) : (
        <Container>
          <Title>Register</Title>
          Your registration has been successfully completed.
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Container>
      )}
    </Wrapper>
  );
};

export default Register;
