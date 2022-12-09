import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyDiary from "./pages/MyDiary";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Friends from "./pages/Friends";
import { fireStore } from "./firebase";

const Background = styled.div`
  background-color: ${(props) => props.theme.light0};
  height: 100vh;
`;

function App() {
  const [userInfo, setUserInfo] = useState({
    username: "ryeowon",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState("routine");
  useEffect(() => {
    console.log(fireStore);
  });
  return (
    <Background>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          currentTab={currentTab}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-diary"
            element={<MyDiary setCurrentTab={setCurrentTab} />}
          />
          <Route
            path="/routine"
            element={<Routine setCurrentTab={setCurrentTab} />}
          />
          <Route
            path="/friends"
            element={<Friends setCurrentTab={setCurrentTab} />}
          />
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

export default App;
