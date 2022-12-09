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

const Background = styled.div`
  background-color: ${(props) => props.theme.light0};
  height: 100vh;
`;

function App() {
  const [userInfo, setUserInfo] = useState({
    username: "ryeowon",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Background>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} userInfo={userInfo} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-diary" element={<MyDiary />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

export default App;
