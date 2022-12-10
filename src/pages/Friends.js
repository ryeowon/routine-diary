import {
  getDatabase,
  onValue,
  query,
  ref,
  orderByChild,
  equalTo,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddFriendModal from "../components/AddFriendModal";
import MyCalander from "../components/Calander";
import FriendList from "../components/FriendList";
import FriendsDiary from "../components/FriendsDiary";

// css for components in Friends.js
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 100px ${(props) => props.theme.wrapper_padding};
  //justify-content: center;
`;

const Friends = ({ setCurrentTab, userInfo, setUserInfo, isLoggedIn }) => {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // set current tab to friends to change color of friends tab.
    setCurrentTab("friends");
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    // get user information again when friend page is loaded.
    if (userInfo) {
      console.log(userInfo);
      const db = getDatabase();
      const idRef = query(ref(db, "/users"), orderByChild("id"));

      let id = userInfo.id;

      const userRef = query(idRef, equalTo(id));

      onValue(
        userRef,
        (snapshot) => {
          console.log("Friend.js", snapshot.val());
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
    }
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Wrapper>
      <MyCalander date={date} setDate={setDate} />
      <FriendsDiary date={date} />
      <FriendList
        setModal={setModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      {modal ? (
        <AddFriendModal setModal={setModal} userInfo={userInfo} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default Friends;
