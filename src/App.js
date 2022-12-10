import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyDiary from "./pages/MyDiary";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Friends from "./pages/Friends";
import { fireStore } from "./firebase";
import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";

const Background = styled.div`
  background-color: ${(props) => props.theme.light0};
  height: 100%;
`;

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState("routine");

  useEffect(() => {
    if (isLoggedIn) {
      const db = getDatabase();
      const idRef = query(ref(db, "/users"), orderByChild("id"));

      let id = userInfo.id;

      const userRef = query(idRef, equalTo(id));

      onValue(
        userRef,
        (snapshot) => {
          console.log("App.js", snapshot.val());
          if (snapshot.val()) {
            setUserInfo(snapshot.val()[id]);
          } else {
            setUserInfo(null);
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      setUserInfo(null);
    }
  }, [isLoggedIn]);

  return (
    <Background>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
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
            element={
              <MyDiary
                setCurrentTab={setCurrentTab}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/routine"
            element={
              <Routine
                setCurrentTab={setCurrentTab}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/friends"
            element={
              <Friends
                setCurrentTab={setCurrentTab}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

export default App;
