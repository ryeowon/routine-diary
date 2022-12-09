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

const Friends = ({ setCurrentTab }) => {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setCurrentTab("friends");
  });

  return (
    <Wrapper>
      <MyCalander date={date} setDate={setDate} />
      <FriendsDiary date={date} />
      <FriendList setModal={setModal} />
      {modal ? <AddFriendModal setModal={setModal} /> : <></>}
    </Wrapper>
  );
};

export default Friends;
